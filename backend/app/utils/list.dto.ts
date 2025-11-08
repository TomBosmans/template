import createZodDTO, { type ZodDTO } from "#lib/dto/zod.dto.ts"
import orderByDTO from "./orderBy.dto.ts"

export default function listDTO(dto: ZodDTO) {
  return createZodDTO((z) =>
    z.object({
      data: dto.schema.array(),
      total: z.number(),
      offset: z.coerce.number().min(0).optional(),
      limit: z.coerce.number().min(1).optional(),
      orderBy: orderByDTO(dto).schema,
    }),
  )
}
