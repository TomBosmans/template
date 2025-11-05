import createDBRepository from "#app/utils/createDBRepository.ts"
import createMemoryRepository from "#app/utils/createMemoryRepository.ts"
import type CrudRepository from "#lib/repository/crudRepository.interface.ts"
import type { EditSession, NewSession, Session } from "./session.entities.ts"

export type SessionRepository = CrudRepository<Session, NewSession, EditSession>
export class SessionDBRepository extends createDBRepository("sessions") {}
export class SessionMemoryRepository extends createMemoryRepository("sessions") {}
