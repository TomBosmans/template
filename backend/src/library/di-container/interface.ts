import type { ClassType, DIRegistry, FunctionType } from "./types.ts"

export default interface DIContainer<Registry extends DIRegistry = DIRegistry> {
  register<Name extends keyof Registry>(
    registration: unknown,
    { name, type }: { name: Name; type: "value" | "function" | "class" },
  ): void
  resolve<ReturnType extends Registry[Name], Name extends keyof Registry = string>(
    name: Name,
  ): ReturnType
  build<T>(registration: ClassType<T> | FunctionType<T> | T): T
}
