import type AsInterface from "#app/utils/asInterface.type.ts"
import type Module from "#lib/module/interface.ts"
import UserFactory from "./user.factory.ts"
import { UserDBRepository, UserMemoryRepository, type UserRepository } from "./user.repository.ts"

const UserModule = {
  appRegistry: {
    userRepository: UserDBRepository as AsInterface<UserRepository>,
  },

  testRegistry: {
    userRepository: UserMemoryRepository as AsInterface<UserRepository>,
    userFactory: UserFactory,
  },

  routes: [],
} as const satisfies Module

export default UserModule
