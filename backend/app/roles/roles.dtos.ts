import createZodDTO from "#lib/dto/zod.dto.ts"

export const RuleDTO = createZodDTO((z) =>
  z.object({
    action: z.string(),
    subject: z.string(),
    conditions: z.object({}).passthrough().optional(),
  }),
)
