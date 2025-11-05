import type AsInterface from "#app/utils/asInterface.type.ts"
import type Module from "#lib/module/interface.ts"
import SessionFactory from "./session.factory.ts"
import {
  SessionDBRepository,
  SessionMemoryRepository,
  type SessionRepository,
} from "./session.repository.ts"

const SessionModule = {
  appRegistry: {
    sessionRepository: SessionDBRepository as AsInterface<SessionRepository>,
  },
  testRegistry: {
    sessionRepository: SessionMemoryRepository as AsInterface<SessionRepository>,
    sessionFactory: SessionFactory,
  },
} as const satisfies Module

export default SessionModule
