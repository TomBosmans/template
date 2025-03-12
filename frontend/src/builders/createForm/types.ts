import type { ErrorOption, FieldValues } from "react-hook-form"
import type { ZodSchema, ZodTypeDef } from "zod"

export type SubmitResult<T extends FieldValues> =
  | {
      success: false
      errors: Partial<Record<keyof T | "root", ErrorOption & { error?: Record<string, unknown> }>>
    }
  | { success: true }

export type OnSubmit<T extends FieldValues> = (data: T) => SubmitResult<T>

export type Params<T extends FieldValues> = {
  schema: ZodSchema<T, ZodTypeDef, T>
  name: string
}
