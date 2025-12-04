import createZodDTO, { type OutputMatchingEntity } from "#lib/dto/zod.dto.ts"
import dateStringSchema from "#lib/zod/dateString.schema.ts"
import { passwordSchema } from "#lib/zod/password.schema.ts"
import type { EditUser, NewUser } from "./user.entities.ts"

export const UserDTO = createZodDTO((z) =>
  z.object({
    id: z.string().uuid(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    role: z.enum(["user", "admin"]),
    createdAt: dateStringSchema,
    updatedAt: dateStringSchema,
  }),
)

export const NewUserDTO = createZodDTO(
  (z) =>
    z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      password: z.string(),
    }) satisfies OutputMatchingEntity<NewUser>,
)

export const EditUserDTO = createZodDTO(
  (z) =>
    z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      email: z.string().optional(),
    }) satisfies OutputMatchingEntity<EditUser>,
)

export const ChangePasswordDTO = createZodDTO((z) =>
  z.object({
    currentPassword: z.string(),
    newPassword: passwordSchema,
  }),
)
