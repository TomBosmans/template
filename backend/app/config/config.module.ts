import Module from "#lib/module/module.ts"
import configFactory from "./config.factory.ts"

const ConfigModule = new Module({
  registry: { config: configFactory, env: process.env },
})

export default ConfigModule
