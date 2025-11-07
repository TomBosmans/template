// biome-ignore lint/suspicious/noExplicitAny: It is ok
type Interface<Interface> = new (...args: any[]) => Interface
export default Interface
