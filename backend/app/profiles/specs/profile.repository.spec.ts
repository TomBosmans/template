import assert from "node:assert"
import { after, afterEach, before, describe, it } from "node:test"
import containerFactory from "#app/container.factory.ts"
import type DatabaseService from "#app/database/database.service.ts"
import { adminRole } from "#app/roles/role.collection.ts"
import type SessionFactory from "#app/sessions/session.factory.ts"
import TestModule from "#app/test/test.module.ts"
import type UserFactory from "#app/users/user.factory.ts"
import RecordNotFoundException from "#lib/exceptions/recordNotFound.exception.ts"
import type ProfileRepository from "../profile.repository.ts"

describe("ProfileRepository", () => {
  let profileRepository: ProfileRepository
  let sessionFactory: SessionFactory
  let userFactory: UserFactory
  let db: DatabaseService

  before(() => {
    const container = containerFactory(TestModule)
    profileRepository = container.resolve("profileRepository")
    sessionFactory = container.resolve("sessionFactory")
    userFactory = container.resolve("userFactory")
    db = container.resolve("db")
  })

  afterEach(async () => await db.truncateAll())
  after(async () => await db.destroy())

  describe("#findeOneOrThrow", () => {
    it("finds profile with the correct user", async () => {
      const session = await sessionFactory.create()
      const profile = await profileRepository.findOneOrThrow({
        where: { hashedToken: session.hashedToken },
      })

      assert.strictEqual(profile.user.id, session.userId)
    })

    it("finds profile with all the sessions for the user", async () => {
      const session = await sessionFactory.create()
      const otherSession = await sessionFactory.create({ userId: session.userId })
      await sessionFactory.createMany(5)
      const profile = await profileRepository.findOneOrThrow({
        where: { hashedToken: session.hashedToken },
      })

      assert.strictEqual(profile.sessions.length, 2)
      assert.deepStrictEqual(
        profile.sessions.map((s) => s.id),
        [session.id, otherSession.id],
      )
    })

    it("returns correct rules", async () => {
      const user = await userFactory.create({ role: "admin" })
      const session = await sessionFactory.create({ userId: user.id })
      const profile = await profileRepository.findOneOrThrow({
        where: { hashedToken: session.hashedToken },
      })

      assert.deepStrictEqual(profile.rules, adminRole.rules)
    })

    it("throws not found exception when session is not found", async () => {
      const hashedToken = ""
      assert.rejects(
        async () => await profileRepository.findOneOrThrow({ where: { hashedToken } }),
        new RecordNotFoundException({ entity: "profile" }),
      )
    })
  })
})
