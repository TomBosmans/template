import { z } from "zod"
import createForm, { } from "../../builders/createForm"
import { OnSubmit as BaseOnSubmit } from "../../builders/createForm/types"

const schema = z.object({
  email: z.string().email().min(1),
})

export type FieldValues = z.input<typeof schema>
export type OnSubmit = BaseOnSubmit<FieldValues>
export const { Form } = createForm({ schema, name: "forgotPassword" })
