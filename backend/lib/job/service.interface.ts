import type Job from "./interface.ts"

export default interface JobService<Registry extends Record<string, Job>> {
  start(): Promise<void>
  stop(): Promise<void>
  register(
    queue: keyof Registry,
    handler: Registry[keyof Registry],
    options?: { concurrency?: number },
  ): Promise<void>
  send<R extends keyof Registry>(
    queue: R,
    params: Parameters<Registry[R]["run"]>[0],
  ): Promise<string>
}
