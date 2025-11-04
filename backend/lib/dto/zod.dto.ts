import { generateMock } from "@anatine/zod-mock"
import { generateSchema } from "@anatine/zod-openapi"
import { z } from "zod"
import Issue from "#lib/exceptions/issue.ts"
import IssueCode from "#lib/exceptions/issueCode.enum.ts"
import ValidationException from "#lib/exceptions/validation.exception.ts"
import type Obj from "#lib/types/obj.type.ts"
import type DTO from "./interface.ts"

type SchemaObject = ReturnType<typeof generateSchema>

function mapZodIssue(issue: z.ZodIssue) {
  return new Issue({
    code: IssueCode[issue.code],
    path: issue.path,
    message: issue.message,
    expected: null,
    received: null,
  })
}

// biome-ignore lint/suspicious/noExplicitAny: We don't care about these 2 types
export type OutputMatchingEntity<Entity extends Obj> = z.ZodSchema<Entity, any, any>

export default function createZodDTO<Schema extends z.ZodSchema>(
  func: (zod: typeof z) => Schema,
): DTO<z.input<Schema>, z.output<Schema>, Schema, SchemaObject> {
  const schema = func(z)

  return {
    schema,
    get openapi() {
      return generateSchema(schema)
    },
    get attributes() {
      return schema instanceof z.ZodObject ? Object.keys(schema.shape) : []
    },

    parse(input: z.input<Schema>) {
      const parsedAttributes = this.schema.safeParse(input)
      if (parsedAttributes.success) {
        return parsedAttributes.data
      } else {
        const issues = parsedAttributes.error.issues.map((issue) => mapZodIssue(issue))
        throw new ValidationException(issues)
      }
    },

    generateRandom() {
      return generateMock(schema)
    },
  }
}
