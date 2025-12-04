import z from "zod"

const dateStringSchema = z
  .string()
  .datetime({ offset: true })
  .or(z.date().transform((date) => date.toISOString()))

export default dateStringSchema
