import type { ZodEnum, ZodOptional } from "zod"
import createZodDTO, { type ZodDTO } from "#lib/dto/zod.dto.ts"

export default function orderByDTO(dto: ZodDTO) {
  const keys = dto.attributes
  type Key = (typeof dto.attributes)[number]
  return createZodDTO((z) =>
    z
      .object(
        keys.reduce(
          (obj, key) => {
            obj[key] = z.enum(["asc", "desc"]).optional()
            return obj
          },
          {} as Record<Key, ZodOptional<ZodEnum<["asc", "desc"]>>>,
        ),
      )
      .strict()
      .optional(),
  )
}
