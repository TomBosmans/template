import { Command } from "commander"
import containerFactory from "#app/container.factory.ts"
import type DIContainer from "#lib/di/container.interface.ts"
import type RegistryFor from "#lib/di/registryFor.type.ts"
import type Module from "#lib/module/module.ts"
import type CLICommand from "./command.interface.ts"
import type CLIProgram from "./program.interface.ts"

// biome-ignore lint/suspicious/noExplicitAny: It is ok here
export default class CommanderProgram<M extends Module<any, any>> implements CLIProgram {
  private readonly program: Command
  public readonly container: DIContainer<RegistryFor<M["registry"]>>

  constructor(module: M) {
    this.program = new Command()
    this.container = containerFactory(module)

    for (const command of module.commands) {
      this.addCommand(command)
    }
  }

  public run() {
    this.program.parse(process.argv)
  }

  private addCommand({ name, description, run, schemas }: CLICommand) {
    const command = new Command(name).description(description)

    for (const option of schemas?.options?.attributes || []) {
      const type = schemas?.options?.attributesWithType[option]
      command.option(`--${option} <${type}>`)
    }

    if (schemas?.argument) {
      command.argument(`<${schemas.argument.type}>`)
    }

    command.action(async (...args) => {
      console.log(schemas?.argument?.attributesWithType)
      console.log(schemas?.argument?.attributesWithType)
      try {
        const hasArg = !!schemas?.argument
        const argument = schemas?.argument?.parse(args[0])
        const options = schemas?.options?.parse(hasArg ? args[1] : args[0])
        await run({ argument, options, container: this.container })
      } catch (err) {
        console.error(err)
      } finally {
        await this.container.dispose()
        process.exit(1)
      }
    })

    this.program.addCommand(command)
  }
}
