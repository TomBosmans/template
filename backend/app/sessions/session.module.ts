import Module from "#lib/module/module.ts"
import type Interface from "#lib/types/interface.type.ts"
import sessionDetailRoute from "./routes/detail.route.ts"
import sessionListRoute from "./routes/list.route.ts"
import { SessionDBRepository, type SessionRepository } from "./session.repository.ts"

const SessionModule = new Module({
  registry: {
    sessionRepository: SessionDBRepository as Interface<SessionRepository>,
  },
  routes: [sessionListRoute, sessionDetailRoute]
})

export default SessionModule
