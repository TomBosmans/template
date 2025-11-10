import type AppRegistry from "./app.registry.ts"
import type { Session } from "./sessions/session.entities.ts"

type RequestRegistry = AppRegistry & { session: Session }
export default RequestRegistry
