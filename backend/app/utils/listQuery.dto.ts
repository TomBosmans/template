import createZodDTO, { type ZodDTO } from "#lib/dto/zod.dto.ts"
import filterDTO from "./fitler.dto.ts"
import orderByDTO from "./orderBy.dto.ts"

export default function listQueryDTO(dto: ZodDTO) {
  return createZodDTO((z) =>
    z
      .object({
        offset: z.coerce.number().min(0).optional().default(0),
        limit: z.coerce.number().min(1).optional().default(25),
        orderBy: orderByDTO(dto).schema.optional(),
        where: filterDTO(dto).schema.optional(),
      })
      .strict(),
  )
}
