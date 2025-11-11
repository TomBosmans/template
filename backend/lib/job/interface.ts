export default interface Job<Params = unknown> {
  run(params: Params): Promise<void>
}

// biome-ignore lint/suspicious/noExplicitAny: It is ok here.
export type JobConstructor<T = unknown> = new (...args: any[]) => Job<T>
