import AwilixContainer from "#lib/di/awilix.container.ts"
import type DIContainer from "#lib/di/container.interface.ts"
import configFactory, { type Config } from "./config.factory.ts"
import KyselyDatabase from "./kysely.db.ts"
import UserRepository from "./users/user.repository.ts"

export type AppRegistry = {
  config: Config
  db: KyselyDatabase
  userRepository: UserRepository
}
export default function containerFactory(): DIContainer<AppRegistry> {
  const container = new AwilixContainer()
  container.register(process.env, { name: "env", type: "value" })
  container.register(configFactory, { name: "config", type: "function" })
  container.register(KyselyDatabase, { name: "db", type: "class" })
  container.register(UserRepository, { name: "userRepository", type: "class" })
  return container
}

export function testContainerFactory(): DIContainer<{ db: KyselyDatabase }> {
  const container = new AwilixContainer()
  container.register(process.env, { name: "env", type: "value" })
  container.register(configFactory, { name: "config", type: "function" })
  container.register(KyselyDatabase, { name: "db", type: "class" })
  return container
}
