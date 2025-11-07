// biome-ignore lint/suspicious/noExplicitAny: It is ok here.
type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (x: infer I) => void
  ? I
  : never

export default UnionToIntersection
