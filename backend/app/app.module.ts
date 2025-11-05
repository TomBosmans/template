import type Module from "#lib/module/interface.ts"
import SessionModule from "./sessions/session.module.ts"
import UserModule from "./users/user.module.ts"

const AppModule = {
  imports: [UserModule, SessionModule],
} as const satisfies Module

export default AppModule
