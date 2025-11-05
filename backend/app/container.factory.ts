import AwilixContainer from "#lib/di/awilix.container.ts"
import type DIContainer from "#lib/di/container.interface.ts"
import type Logger from "#lib/logger/interface.ts"
import WinstonLogger from "#lib/logger/winstond.logger.ts"
import AppModule from "./app.module.ts"
import configFactory, { type Config } from "./config.factory.ts"
import KyselyDatabase from "./kysely.db.ts"

const modules = AppModule.imports

// biome-ignore lint/suspicious/noExplicitAny: It is ok
type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (x: infer I) => void
  ? I
  : never

type Modules = UnionToIntersection<(typeof modules)[number]>

type ModuleRegistries<R extends keyof Modules> = {
  [K in keyof Modules[R]]: Modules[R][K] extends new (
    // biome-ignore lint/suspicious/noExplicitAny: It is ok
    ...args: any[]
    // biome-ignore lint/suspicious/noExplicitAny: It is ok
  ) => any
    ? InstanceType<Modules[R][K]>
    : Modules[R][K]
}

export type AppRegistry = {
  config: Config
  db: KyselyDatabase
  logger: Logger
  trace?: { id: string; source: string }
} & ModuleRegistries<"appRegistry">

export type TestRegistry = {
  config: Config
  logger: Logger
} & ModuleRegistries<"testRegistry">

export type AppContainer = DIContainer<AppRegistry>
export default function containerFactory(): DIContainer<AppRegistry> {
  const container = new AwilixContainer()
  container.register(process.env, { name: "env", type: "value" })
  container.register(configFactory, { name: "config", type: "function" })
  container.register(WinstonLogger, { name: "logger", type: "class" })
  container.register(KyselyDatabase, { name: "db", type: "class" })
  container.register({}, { name: "trace", type: "value" })

  for (const module of modules) {
    for (const [name, registry] of Object.entries(module.appRegistry)) {
      container.register(registry, { name, type: "class" })
    }
  }
  return container
}

export function testContainerFactory(): DIContainer<TestRegistry> {
  const container = new AwilixContainer()
  container.register(process.env, { name: "env", type: "value" })
  container.register(configFactory, { name: "config", type: "function" })
  container.register(WinstonLogger, { name: "logger", type: "class" })

  for (const module of modules) {
    for (const [name, registry] of Object.entries(module.testRegistry)) {
      container.register(registry, { name, type: "class" })
    }
  }
  return container
}
