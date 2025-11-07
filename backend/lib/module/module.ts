import type DIRegistry from "#lib/di/registry.type.ts"
import type HTTPRoute from "#lib/http/route.ts"
import type UnionToIntersection from "#lib/types/unionToIntersection.type.ts"

export default class Module<
  // biome-ignore lint/complexity/noBannedTypes: autocompletion stops working otherwise.
  Registry extends DIRegistry = {},
  // biome-ignore lint/suspicious/noExplicitAny: It is ok here.
  Imports extends Module<any, any>[] = [],
> {
  private readonly _imports: Imports
  private readonly _registry: Registry
  private readonly _routes: HTTPRoute[]

  constructor(
    params: {
      imports?: Imports
      registry?: Registry
      routes?: HTTPRoute[]
    } = {},
  ) {
    this._imports = params.imports || ([] as unknown as Imports)
    this._registry = params.registry || ({} as Registry)
    this._routes = params.routes || []
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
}
