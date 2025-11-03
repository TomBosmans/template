import type { AppRegistry } from "#app/container.factory.ts"
import RandomEntityFactory from "#lib/randomEntity.factory.ts"
import { NewUserDTO } from "./user.dtos.ts"
import type { NewUser, User } from "./user.entities.ts"

export default class UserFactory extends RandomEntityFactory<NewUser, User> {
  private readonly userRepository: AppRegistry["userRepository"]

  constructor({ userRepository }: AppRegistry) {
    super()
    this.userRepository = userRepository
  }

  protected generate(): NewUser {
    return NewUserDTO.generateRandom()
  }

  protected async save(newUser: NewUser): Promise<User> {
    return await this.userRepository.createOne(newUser)
  }
}
