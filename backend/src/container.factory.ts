import configFactory, { type Config } from "./config.factory.ts"
import AwilixContainer from "./library/di-container/awilix.di-container.ts"
import type DIContainer from "./library/di-container/interface.ts"
import { type MailService, ReacEmailMailService } from "mails"
import MemoryRepository from "./library/repository/memory.repository.ts"
import Repository from "./library/repository/interface.ts"
import User from "./entities/user.ts"

export type AppRegistry = {
  env: Record<string, unknown>
  config: Config
  mailService: MailService
  userRepository: Repository<User>
}

export default function containerFactory(): DIContainer<AppRegistry> {
  const container = new AwilixContainer<AppRegistry>()

  container.register(process.env, { name: "env", type: "value" })
  container.register(configFactory, { name: "config", type: "function" })
  container.register(ReacEmailMailService, { name: "mailService", type: "class" })
  container.register(MemoryRepository, { name: "userRepository", type: "class" })

  return container
}
