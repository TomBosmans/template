/** biome-ignore-all lint/suspicious/noExplicitAny: It is ok here */

type RegistryFor<Obj extends Record<string, unknown>> = {
  [K in keyof Obj]: Obj[K] extends new (
    ...args: any[]
  ) => any
    ? InstanceType<Obj[K]> // If it's a class, get the instance type
    : Obj[K] extends (...args: any[]) => any
      ? ReturnType<Obj[K]> // If it's a function, get the return type
      : Obj[K] // Otherwise, keep as-is
}

export default RegistryFor
