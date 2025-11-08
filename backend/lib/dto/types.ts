/** biome-ignore-all lint/suspicious/noExplicitAny: It is ok here. */
import type DTO from "./interface.ts"

export type DTOInput<T extends DTO> = T extends DTO<infer Input, any, any> ? Input : never
export type DTOOutput<T extends DTO> = T extends DTO<any, infer Output, any> ? Output : never
export type DTOSchema<T extends DTO> = T extends DTO<any, any, infer Schema> ? Schema : never
