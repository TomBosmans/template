import createMemoryRepository from "#app/utils/createMemoryRepository.ts"
import createKyselyRepository from "#lib/repository/kysely/crud.repository.ts"

export default class UserRepository extends createKyselyRepository("users") { }
export class UserMemoryRepository extends createMemoryRepository("users") { }
