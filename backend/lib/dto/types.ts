import type DTO from "./interface.ts"

export type DTOInput<T extends DTO> = T extends DTO<infer Input, unknown, unknown> ? Input : never
export type DTOOutput<T extends DTO> = T extends DTO<unknown, infer Output, unknown>
  ? Output
  : never
export type DTOSchema<T extends DTO> = T extends DTO<unknown, unknown, infer Schema>
  ? Schema
  : never
