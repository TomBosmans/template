import createZodDTO from "#lib/dto/zod.dto.ts"

export const HealthDTO = createZodDTO((z) =>
  z.object({
    httpServer: z.object({
      ok: z.boolean(),
      sessions: z.number().optional(),
    }),
    postgres: z
      .object({ ok: z.literal(true), connections: z.number() })
      .or(z.object({ ok: z.literal(false) })),
  }),
)

export const ReadyDTO = createZodDTO((z) =>
  z.object({
    status: z.enum(["ready", "degraded"]),
    services: z.object({ postgres: z.boolean() }),
  }),
)
