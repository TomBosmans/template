import createDBRepository from "#app/utils/createDBRepository.ts"
import createMemoryRepository from "#app/utils/createMemoryRepository.ts"
import ValidationException from "#lib/exceptions/validation.exception.ts"
import type CrudRepository from "#lib/repository/crudRepository.interface.ts"
import type { EditUser, NewUser, User } from "./user.entities.ts"

export type UserRepository = CrudRepository<User, NewUser, EditUser>
export class UserDBRepository extends createDBRepository("users") implements UserRepository {}
export class UserMemoryRepository
  extends createMemoryRepository("users")
  implements UserRepository
{
  protected validate(user: User): void {
    this.validateEmailIsUnique(user)
  }

  private validateEmailIsUnique(user: User) {
    if (this.findOne({ where: { email: user.email, id: { $ne: user.id } } })) {
      throw new ValidationException([
        { code: "not_unique", path: ["email"], message: `${user.email} is not unique` },
      ])
    }
  }
}
