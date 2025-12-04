type XOR<T, U> = (T & { [K in keyof U]?: never }) | (U & { [K in keyof T]?: never })
export default XOR
