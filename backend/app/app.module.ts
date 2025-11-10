import Module from "#lib/module/module.ts"
import AuthModule from "./auth/auth.module.ts"
import ConfigModule from "./config/config.module.ts"
import DatabaseModule from "./database/database.module.ts"
import MailerModule from "./mailer/mailer.module.ts"
import ObservabilityModule from "./observability/observability.module.ts"
import SessionModule from "./sessions/session.module.ts"
import UserModule from "./users/user.module.ts"

const AppModule = new Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    ObservabilityModule,
    MailerModule,
    UserModule,
    SessionModule,
    AuthModule,
  ],
})

export default AppModule
