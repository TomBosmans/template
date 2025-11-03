import createDBRepository from "#app/utils/createDBRepository.ts"
import createMemoryRepository from "#app/utils/createMemoryRepository.ts"

export default class UserRepository extends createDBRepository("users") {}
export class UserMemoryRepository extends createMemoryRepository("users") {}
