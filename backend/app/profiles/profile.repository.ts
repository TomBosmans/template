import z from "zod"
import type AppRegistry from "#app/app.registry.ts"
import type { Rule } from "#app/roles/role.entities.ts"
import type { Session } from "#app/sessions/session.entities.ts"
import type { User } from "#app/users/user.entities.ts"
import type { OutputMatchingEntity } from "#lib/dto/zod.dto.ts"
import RecordNotFoundException from "#lib/exceptions/recordNotFound.exception.ts"

// INFO: We need to use something to transform the json from the sql into the expected types
const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
  role: z.enum(["user", "admin"]),
}) satisfies OutputMatchingEntity<User>

const sessionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  hashedToken: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
}) satisfies OutputMatchingEntity<Session>

const ruleSchema = z.object({
  subject: z.enum(["User", "Session"]),
  action: z.enum(["crud", "create", "read", "update", "delete"]),
  conditions: z.object({}).passthrough().optional(),
}) satisfies OutputMatchingEntity<Rule>

const schema = z.object({
  user: userSchema,
  currentSession: sessionSchema,
  sessions: sessionSchema.array(),
  rules: ruleSchema.array(),
})

export default class ProfileRepository {
  private readonly db: AppRegistry["db"]
  private readonly roleRepository: AppRegistry["roleRepository"]

  constructor({ db, roleRepository }: AppRegistry) {
    this.db = db
    this.roleRepository = roleRepository
  }
  async findOne(params: { where: { hashedToken: string } }) {
    const profile = await this.query
      .where("currentSession.hashedToken", "=", params.where.hashedToken)
      .executeTakeFirst()
    if (!profile) return null

    const rules: Rule[] =
      this.roleRepository.findOne({ where: { name: profile.user.role } })?.rules || []
    return schema.parse({ ...profile, rules })
  }

  async findOneOrThrow(params: { where: { hashedToken: string } }) {
    const profile = await this.findOne(params)
    if (!profile) throw new RecordNotFoundException({ entity: "profile" })
    return profile
  }

  private get query() {
    return this.db
      .selectFrom("sessions as currentSession")
      .select((eb) => eb.fn.toJson("currentSession").as("currentSession"))
      .innerJoin("users", "currentSession.userId", "users.id")
      .select((eb) => eb.fn.toJson("users").as("user"))
      .leftJoin("sessions", "currentSession.userId", "sessions.userId")
      .select((eb) => eb.fn.jsonAgg("sessions").as("sessions"))
      .groupBy(["currentSession.id", "users.id"])
  }
}
