import Module from "#lib/module/module.ts"
import type Interface from "#lib/types/interface.type.ts"
import createUserCommand from "./commands/create.command.ts"
import deleteUserCommand from "./commands/delete.command.ts"
import userDetailRoute from "./routes/detail.route.ts"
import userListRoute from "./routes/list.route.ts"
import { UserDBRepository, type UserRepository } from "./user.repository.ts"

const UserModule = new Module({
  registry: {
    userRepository: UserDBRepository as Interface<UserRepository>,
  },
  routes: [userListRoute, userDetailRoute],
  commands: [createUserCommand, deleteUserCommand],
})

export default UserModule
