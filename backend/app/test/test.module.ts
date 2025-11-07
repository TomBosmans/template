import AppModule from "#app/app.module.ts"
import SessionFactory from "#app/sessions/session.factory.ts"
import UserFactory from "#app/users/user.factory.ts"
import Module from "#lib/module/module.ts"

const TestModule = new Module({
  imports: [AppModule],
  registry: {
    userFactory: UserFactory,
    sessionFactory: SessionFactory,
  },
})

export default TestModule
