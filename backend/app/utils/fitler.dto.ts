import { ZodObject, type ZodSchema, type ZodTypeAny } from "zod"
import type DTO from "#lib/dto/interface.ts"
import type { DTOOutput } from "#lib/dto/types.ts"
import createZodDTO, { type ZodDTO } from "#lib/dto/zod.dto.ts"
import type { Where } from "#lib/repository/types.ts"

export default function filterDTO<ZDTO extends ZodDTO>(dto: ZDTO) {
  const schema = dto.schema
  if (!(schema instanceof ZodObject)) throw Error("dto must be object")
  const shape = schema.shape

  const newDTO = createZodDTO((z) => {
    const obj = Object.keys(schema.shape).reduce(
      (obj, key) => {
        const s = shape[key]
        obj[key] = z
          .object({
            $match: s.nullable(),
            $eq: s.nullable(),
            $ne: s.nullable(),
            $lt: s.nullable(),
            $lte: s.nullable(),
            $gt: s.nullable(),
            $gte: s.nullable(),
            $in: s.array().nullable(),
            $nin: s.array().nullable(),
          })
          .strip()
          .or(s.optional().nullable())

        return obj
      },
      {} as Record<string, ZodTypeAny>,
    )

    return z.object(obj).strict()
  })

  type Filter = Where<DTOOutput<ZDTO>>
  return newDTO as DTO<unknown, Filter, ZodSchema<Filter>>
}
