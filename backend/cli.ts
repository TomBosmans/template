import AppModule from "./app/app.module.ts"
import CommanderProgram from "./lib/cli/commander.program.ts"

const program = new CommanderProgram(AppModule)
program.container.register({ id: "cli", source: "command" }, { name: "trace", type: "value" })
program.run()
