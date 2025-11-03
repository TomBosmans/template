import createZodDTO, { type OutputMatchingEntity } from "#lib/dto/zod.dto.ts"
import { passwordSchema } from "#lib/zod/password.schema.ts"
import type { EditUser, NewUser, User } from "./user.entities.ts"

export const UserDTO = createZodDTO(
  (z) =>
    z.object({
      id: z.string().uuid(),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      createdAt: z.coerce.date(),
      updatedAt: z.coerce.date(),
    }) satisfies OutputMatchingEntity<Omit<User, "password">>,
)

export const NewUserDTO = createZodDTO(
  (z) =>
    z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      password: passwordSchema,
    }) satisfies OutputMatchingEntity<NewUser>,
)

export const EditUserDTO = createZodDTO((z) =>
  z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(),
  }) satisfies OutputMatchingEntity<EditUser>,
)

export const ChangePasswordDTO = createZodDTO((z) => z.object({
  currentPassword: z.string(),
  newPassword: passwordSchema,
}))
