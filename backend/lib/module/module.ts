import type CLICommand from "#lib/cli/command.interface.ts"
import type DIRegistry from "#lib/di/registry.type.ts"
import type HTTPRoute from "#lib/http/route.ts"
import type { JobConstructor } from "#lib/job/interface.ts"
import type UnionToIntersection from "#lib/types/unionToIntersection.type.ts"

type JobRegistryTest = Record<string, JobConstructor>

export default class Module<
  // biome-ignore lint/complexity/noBannedTypes: autocompletion stops working otherwise.
  Registry extends DIRegistry = {},
  // biome-ignore lint/suspicious/noExplicitAny: It is ok here.
  Imports extends Module<any, any>[] = [],
  // biome-ignore lint/complexity/noBannedTypes: autocompletion stops working otherwise.
  JobRegistry extends JobRegistryTest = {},
> {
  private readonly _imports: Imports
  private readonly _registry: Registry
  private readonly _routes: HTTPRoute[]
  private readonly _jobs: JobRegistry
  private readonly _commands: CLICommand[]

  constructor(
    params: {
      imports?: Imports
      registry?: Registry
      routes?: HTTPRoute[]
      jobs?: JobRegistry
      commands?: CLICommand[]
    } = {},
  ) {
    this._imports = params.imports || ([] as unknown as Imports)
    this._registry = params.registry || ({} as Registry)
    this._routes = params.routes || []
    this._jobs = params.jobs || ({} as JobRegistry)
    this._commands = params.commands || ([] as unknown as CLICommand[])
  }

  public get imports(): Imports {
    const seen = new Set<Imports[number]>()
    const stack = [...this._imports]

    while (stack.length) {
      const mod = stack.pop()
      if (!mod) continue
      if (seen.has(mod)) continue
      seen.add(mod)
      stack.push(...(mod._imports as unknown as Imports))
    }

    return Array.from(seen) as Imports
  }

  public get commands(): CLICommand[] {
    const allModules = [this, ...this.imports]
    const seen = new Set<CLICommand>()
    const commands: CLICommand[] = []

    for (const mod of allModules) {
      for (const command of mod._commands) {
        if (!seen.has(command)) {
          seen.add(command)
          commands.push(command)
        }
      }
    }

    return commands
  }

  public get routes(): HTTPRoute[] {
    const allModules = [this, ...this.imports]
    const seen = new Set<HTTPRoute>()
    const routes: HTTPRoute[] = []

    for (const mod of allModules) {
      for (const route of mod._routes) {
        if (!seen.has(route)) {
          seen.add(route)
          routes.push(route)
        }
      }
    }

    return routes
  }

  public get registry(): Registry & UnionToIntersection<Imports[number]["registry"]> {
    const registry: DIRegistry = { ...this._registry }

    for (const i of this.imports) {
      for (const [key, value] of Object.entries(i._registry)) {
        registry[key] = value as DIRegistry[string]
      }
    }

    return registry as Registry & UnionToIntersection<Imports[number]["registry"]>
  }

  public get jobs(): JobRegistry & UnionToIntersection<Imports[number]["jobs"]> {
    const mergedJobs: JobRegistryTest = { ...this._jobs }

    for (const mod of this.imports) {
      for (const [key, job] of Object.entries(mod._jobs)) {
        mergedJobs[key] = job as JobConstructor
      }
    }

    // Cast to the desired generic intersection type
    return mergedJobs as JobRegistry & UnionToIntersection<Imports[number]["jobs"]>
  }
}
