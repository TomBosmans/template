import {
  type AwilixContainer as Awilix,
  asClass,
  asFunction,
  asValue,
  createContainer,
} from "awilix"
import type DIContainer from "./interface.ts"
import type { ClassType, DIRegistry, FunctionType } from "./types.ts"

const TypeMapper = {
  class: asClass,
  function: asFunction,
  value: asValue,
} as const

export default class AwilixContainer<Registry extends DIRegistry> implements DIContainer<Registry> {
  private readonly awilix: Awilix

  constructor(container?: Awilix) {
    this.awilix =
      container ||
      createContainer({
        injectionMode: "PROXY",
        strict: true,
      })
  }

  public register(
    registration: Parameters<DIContainer<Registry>["register"]>[0],
    { name, type = "class" }: Parameters<DIContainer<Registry>["register"]>[1],
  ) {
    const asType = TypeMapper[type]
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    this.awilix.register(name as any, asType(registration as any, { lifetime: "SINGLETON" }))
  }

  public resolve<T extends Registry[Name], Name extends keyof Registry>(name: Name): T {
    return this.awilix.resolve(name) as T
  }

  public build<T>(registration: ClassType<T> | FunctionType<T> | T) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    return this.awilix.build<T>(registration as any)
  }
}
