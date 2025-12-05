import z from "zod"

export default function getType(schema: z.ZodSchema): string {
  if (schema instanceof z.ZodObject) return "object"
  if (schema instanceof z.ZodString) return "string"
  if (schema instanceof z.ZodNumber) return "number"
  if (schema instanceof z.ZodBoolean) return "boolean"
  if (schema instanceof z.ZodArray) return "array"
  if (schema instanceof z.ZodUnion) return "union"
  if (schema instanceof z.ZodLiteral) return "literal"
  if (schema instanceof z.ZodEnum) return "enum"
  if (schema instanceof z.ZodOptional) return `optional(${getType(schema._def.innerType)})`
  if (schema instanceof z.ZodNullable) return `nullable(${getType(schema._def.innerType)})`
  if (schema instanceof z.ZodDefault) return `default(${getType(schema._def.innerType)})`
  if (schema instanceof z.ZodTuple) return "tuple"
  if (schema instanceof z.ZodRecord) return "record"
  if (schema instanceof z.ZodIntersection) return "intersection"
  if (schema instanceof z.ZodMap) return "map"
  if (schema instanceof z.ZodSet) return "set"
  return "unknown"
}
