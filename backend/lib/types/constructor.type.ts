// biome-ignore lint/suspicious/noExplicitAny: It is ok here
type Constructor<T> = new (...args: any[]) => T
export default Constructor
