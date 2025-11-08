import createZodDTO from "#lib/dto/zod.dto.ts"

const DetailParamsDTO = createZodDTO((z) => z.object({ id: z.string().uuid() }))
export default DetailParamsDTO
