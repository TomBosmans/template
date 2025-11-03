import createDBRepository from "#app/utils/createDBRepository.ts"
import createMemoryRepository from "#app/utils/createMemoryRepository.ts"
import ValidationException from "#lib/exceptions/validation.exception.ts"
import { type User } from "./user.entities.ts"

export default class UserRepository extends createDBRepository("users") { }
export class UserMemoryRepository extends createMemoryRepository("users") {
  protected validate(user: User): void {
    this.validateEmailIsUnique(user)
  }

  private validateEmailIsUnique(user: User) {
    if (this.findOne({ where: { email: user.email, id: { $ne: user.id } } })) {
      throw new ValidationException([{ code: "not_unique", path: ["email"], message: `${user.email} is not unique`}])
    }
  }
}
