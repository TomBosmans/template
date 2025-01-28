import { z } from "zod"
import createForm from "../../builders/createForm"

const schema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
  rememberMe: z.boolean(),
})

export type FieldValues = z.input<typeof schema>
export const { errorsAtom, valuesAtom, Form } = createForm({ schema, name: "signIn" })
