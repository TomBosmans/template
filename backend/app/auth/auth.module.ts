import Argon2Hasher from "#lib/hasher/argon2.hahser.ts"
import Module from "#lib/module/module.ts"
import OsloTokenService from "#lib/tokens/osloToken.service.ts"
import AuthService from "./auth.service.ts"
import signInRoute from "./routes/signIn.route.ts"
import signOutRoute from "./routes/signOut.route.ts"
import signUpRoute from "./routes/signUp.route.ts"

const AuthModule = new Module({
  registry: {
    authService: AuthService,
    hasher: Argon2Hasher,
    tokenService: OsloTokenService,
  },
  routes: [signUpRoute, signOutRoute, signInRoute],
})

export default AuthModule
