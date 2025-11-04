export default interface DTO<
  Input = unknown,
  Output = unknown,
  Schema = unknown,
  Openapi = Record<string, unknown>,
> {
  openapi: Openapi
  attributes: string[]
  schema: Schema
  generateRandom: () => Output
  parse: (input: Input) => Output
}
