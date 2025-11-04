import AwilixContainer from "#lib/di/awilix.container.ts"
import type DIContainer from "#lib/di/container.interface.ts"
import type Logger from "#lib/logger/interface.ts"
import WinstonLogger from "#lib/logger/winstond.logger.ts"
import configFactory, { type Config } from "./config.factory.ts"
import KyselyDatabase from "./kysely.db.ts"
import UserRepository from "./users/user.repository.ts"

export type AppRegistry = {
  config: Config
  db: KyselyDatabase
  logger: Logger
  userRepository: UserRepository
  trace?: { id: string; source: string }
}
export default function containerFactory(): DIContainer<AppRegistry> {
  const container = new AwilixContainer()
  container.register(process.env, { name: "env", type: "value" })
  container.register(configFactory, { name: "config", type: "function" })
  container.register(WinstonLogger, { name: "logger", type: "class" })
  container.register(KyselyDatabase, { name: "db", type: "class" })
  container.register(UserRepository, { name: "userRepository", type: "class" })
  container.register({}, { name: "trace", type: "value" })
  return container
}

export function testContainerFactory(): DIContainer {
  const container = new AwilixContainer()
  container.register(process.env, { name: "env", type: "value" })
  container.register(configFactory, { name: "config", type: "function" })
  container.register(KyselyDatabase, { name: "db", type: "class" })
  container.register(WinstonLogger, { name: "logger", type: "class" })
  return container
}
