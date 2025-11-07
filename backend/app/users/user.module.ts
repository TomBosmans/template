import Module from "#lib/module/module.ts"
import type Interface from "#lib/types/interface.type.ts"
import { UserDBRepository, type UserRepository } from "./user.repository.ts"

const UserModule = new Module({
  registry: {
    userRepository: UserDBRepository as Interface<UserRepository>,
  },
  routes: [],
})

export default UserModule
