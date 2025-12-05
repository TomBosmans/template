export default interface Command<Args extends unknown[]> {
  name: string
  description: string
  get options(): Array<{
    flag: keyof Args
    shortFlag?: string
    description: string
    defaultValue?: unknown
  }>
  run(...args: Args): void | Promise<void>
}
