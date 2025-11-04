import createDBRepository from "#app/utils/createDBRepository.ts"
import createMemoryRepository from "#app/utils/createMemoryRepository.ts"

export default class SessionRepository extends createDBRepository("sessions") { }
export class SessionMemoryRepository extends createMemoryRepository("sessions") { }
