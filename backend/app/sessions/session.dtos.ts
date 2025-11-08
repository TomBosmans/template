import createZodDTO, { type OutputMatchingEntity } from "#lib/dto/zod.dto.ts"
import type { NewSession, Session } from "./session.entities.ts"

export const SessionDTO = createZodDTO(
  (z) =>
    z.object({
      id: z.string().uuid(),
      userId: z.string().uuid(),
      expiresAt: z.coerce.date(),
      createdAt: z.coerce.date(),
      updatedAt: z.coerce.date(),
    }) satisfies OutputMatchingEntity<Omit<Session, "hashedToken">>,
)

export const NewSessionDTO = createZodDTO(
  (z) =>
    z.object({
      hashedToken: z.string(),
      userId: z.string(),
      expiresAt: z.coerce.date(),
    }) satisfies OutputMatchingEntity<NewSession>,
)
