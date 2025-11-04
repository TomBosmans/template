import AwilixContainer from "#lib/di/awilix.container.ts"
import type DIContainer from "#lib/di/container.interface.ts"
import type Logger from "#lib/logger/interface.ts"
import WinstonLogger from "#lib/logger/winstond.logger.ts"
import configFactory, { type Config } from "./config.factory.ts"
import KyselyDatabase from "./kysely.db.ts"
import SessionFactory from "./sessions/session.factory.ts"
import SessionRepository, { SessionMemoryRepository } from "./sessions/session.repository.ts"
import UserFactory from "./users/user.factory.ts"
import UserRepository, { UserMemoryRepository } from "./users/user.repository.ts"

export type AppRegistry = {
  config: Config
  db: KyselyDatabase
  logger: Logger
  userRepository: UserRepository
  sessionRepository: SessionRepository
  trace?: { id: string; source: string }
}

export type TestRegistry = {
  config: Config
  logger: Logger
  userRepository: UserRepository
  sessionRepository: SessionRepository
  userFactory: UserFactory
  sessionFactory: SessionFactory
}

export default function containerFactory(): DIContainer<AppRegistry> {
  const container = new AwilixContainer()
  container.register(process.env, { name: "env", type: "value" })
  container.register(configFactory, { name: "config", type: "function" })
  container.register(WinstonLogger, { name: "logger", type: "class" })
  container.register(KyselyDatabase, { name: "db", type: "class" })
  container.register(UserRepository, { name: "userRepository", type: "class" })
  container.register(SessionRepository, { name: "sessionRepository", type: "class" })
  container.register({}, { name: "trace", type: "value" })
  return container
}

export function testContainerFactory(): DIContainer<TestRegistry> {
  const container = new AwilixContainer()
  container.register(process.env, { name: "env", type: "value" })
  container.register(configFactory, { name: "config", type: "function" })
  container.register(WinstonLogger, { name: "logger", type: "class" })
  container.register(UserMemoryRepository, { name: "userRepository", type: "class" })
  container.register(SessionMemoryRepository, { name: "sessionRepository", type: "class" })
  container.register(UserFactory, { name: "userFactory", type: "class" })
  container.register(SessionFactory, { name: "sessionFactory", type: "class" })
  return container
}
