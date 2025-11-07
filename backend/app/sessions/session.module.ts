import Module from "#lib/module/module.ts"
import type Interface from "#lib/types/interface.type.ts"
import { SessionDBRepository, type SessionRepository } from "./session.repository.ts"

const SessionModule = new Module({
  registry: {
    sessionRepository: SessionDBRepository as Interface<SessionRepository>,
  },
})

export default SessionModule
