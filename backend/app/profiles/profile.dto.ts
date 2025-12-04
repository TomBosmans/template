import { RuleDTO } from "#app/roles/roles.dtos.ts"
import { UserDTO } from "#app/users/user.dtos.ts"
import createZodDTO from "#lib/dto/zod.dto.ts"

const ProfileDTO = createZodDTO((z) =>
  z.object({
    user: UserDTO.schema,
    rules: RuleDTO.schema.array(),
  }),
)

export default ProfileDTO
