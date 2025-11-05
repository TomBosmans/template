import z from "zod"

const booleanSchema = z.preprocess(
  (v) => (typeof v === "string" ? ["true", "TRUE", "1"].includes(v) : v),
  z.boolean().default(true),
)

export default booleanSchema
