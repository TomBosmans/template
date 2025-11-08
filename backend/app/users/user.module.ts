import Module from "#lib/module/module.ts"
import type Interface from "#lib/types/interface.type.ts"
import userListRoute from "./routes/list.route.ts"
import UserFactory from "./user.factory.ts"
import { UserDBRepository, type UserRepository } from "./user.repository.ts"

const UserModule = new Module({
  registry: {
    userRepository: UserDBRepository as Interface<UserRepository>,
    userFactory: UserFactory,
  },
  routes: [userListRoute],
})

export default UserModule
