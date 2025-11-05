// biome-ignore lint/suspicious/noExplicitAny: It is ok
type AsInterface<Interface> = new (...args: any[]) => Interface
export default AsInterface
