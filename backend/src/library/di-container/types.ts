// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type ClassType<T = any> = new (...args: any[]) => T
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type FunctionType<T = any> = (...args: any[]) => T
export type ValueType = string | number | Record<string, unknown>
export type DIRegistry = Record<string | symbol, Partial<ClassType | FunctionType | ValueType>>
