import AwilixContainer from "#lib/di/awilix.container.ts"
import type DIContainer from "#lib/di/container.interface.ts"
import configFactory, { type Config } from "./config.factory.ts"

export type AppRegistry = {
  config: Config
}
export default function containerFactory(): DIContainer<AppRegistry> {
  const container = new AwilixContainer()
  container.register(process.env, { name: "env", type: "value" })
  container.register(configFactory, { name: "config", type: "function" })
  return container
}
