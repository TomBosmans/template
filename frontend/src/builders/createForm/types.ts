import type { FieldValues } from "react-hook-form"
import type { ZodSchema, ZodTypeDef } from "zod"

export type Params<T extends FieldValues> = {
  schema: ZodSchema<T, ZodTypeDef, T>
  name: string
}
