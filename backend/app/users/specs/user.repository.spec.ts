import assert from "node:assert"
import { after, afterEach, before, describe, it } from "node:test"
import { testContainerFactory } from "#app/container.factory.ts"
import type KyselyDatabase from "#app/kysely.db.ts"
import ValidationException from "#lib/exceptions/validation.exception.ts"
import UserFactory from "../user.factory.ts"
import UserRepository, { UserMemoryRepository } from "../user.repository.ts"

for (const Repository of [UserRepository, UserMemoryRepository]) {
  describe(Repository.name, () => {
    const container = testContainerFactory()
    container.register(Repository, { name: "userRepository", type: "class" })
    container.register(UserFactory, { name: "userFactory", type: "class" })

    let userFactory: UserFactory
    let userRepository: UserRepository
    let db: KyselyDatabase

    before(() => {
      userFactory = container.resolve("userFactory")
      userRepository = container.resolve("userRepository")
      db = container.resolve("db")
    })

    afterEach(async () => {
      await userRepository.truncate()
    })

    after(async () => {
      await db.destroy()
      await container.dispose()
    })

    describe("#createOne", () => {
      it("can create a new user", async () => {
        const newUser = userFactory.build()
        const user = await userRepository.createOne(newUser)
        assert.ok(user, "is created")
        assert.ok(user.id, "has an id")
        assert.ok(user.createdAt, "has createdAt")
        assert.ok(user.updatedAt, "has updatedAt")

        assert.deepStrictEqual(
          user,
          await userRepository.findOne({ where: { id: user.id } }),
          "is persisted",
        )
      })

      it("must have a unique id", async () => {
        const existingUser = await userFactory.create()
        const newUser = userFactory.build({ id: existingUser.id })
        await assert.rejects(
          async () => await userRepository.createOne(newUser),
          new ValidationException([
            { code: "not_unique", path: ["id"], message: `${existingUser.id} is not unique` },
          ]),
        )
      })

      it("must have a unique email", async () => {
        await userFactory.create({ email: "my@email.com" })
        const newUser = userFactory.build({ email: "my@email.com" })
        await assert.rejects(
          async () => await userRepository.createOne(newUser),
          new ValidationException([
            { code: "not_unique", path: ["email"], message: `${newUser.email} is not unique` },
          ]),
        )
      })
    })

    describe("#createMany", () => {
      it("can create multiple users", async () => {
        const newUsers = userFactory.buildMany(4)
        const users = await userRepository.createMany(newUsers)
        assert.ok(users.length === 4, "are created")
        assert.ok(users.map((u) => u.id).filter((u) => u).length === 4, "have an id")
        assert.ok(users.map((u) => u.createdAt).filter((u) => u).length === 4, "have createdAt")
        assert.ok(users.map((u) => u.updatedAt).filter((u) => u).length === 4, "have updatedAt")

        const persistedUsers = await userRepository.findMany({
          where: { id: { $in: users.map((u) => u.id) } },
        })

        assert.ok(persistedUsers.length === 4, "are persisted")
      })

      it("must have a unique id", async () => {
        const existingUser = await userFactory.create()
        const newUser = userFactory.build({ id: existingUser.id })
        await assert.rejects(
          async () => await userRepository.createMany([newUser]),
          new ValidationException([
            { code: "not_unique", path: ["id"], message: `${existingUser.id} is not unique` },
          ]),
        )
      })

      it("must have a unique email", async () => {
        await userFactory.create({ email: "my@email.com" })
        const newUser = userFactory.build({ email: "my@email.com" })
        await assert.rejects(
          async () => await userRepository.createMany([newUser]),
          new ValidationException([
            { code: "not_unique", path: ["email"], message: `${newUser.email} is not unique` },
          ]),
        )
      })
    })

    describe("#update", () => {
      it("can update a user", async () => {
        const user = await userFactory.create({ email: "old@email.com" })
        const email = "new@email.com"
        const updatedUser = await userRepository.update({ where: { id: user.id }, set: { email } })
        assert.strictEqual(updatedUser.length, 1, "returns only 1 user")
        assert.strictEqual(updatedUser[0].email, email, "email has been updated")

        const persistedUser = await userRepository.findOneOrThrow({ where: { id: user.id } })
        assert.strictEqual(persistedUser.email, email, "update is persisted")
      })

      // does this even make sense?
      it.skip("must have a unique id", async () => {
        const { id } = await userFactory.create()
        const user = await userFactory.create()
        await assert.rejects(
          async () => await userRepository.update({ where: { id: user.id }, set: { id } }),
          new ValidationException([
            { code: "not_unique", path: ["id"], message: `${id} is not unique` },
          ]),
        )
      })

      it("must have a unique email", async () => {
        const { email } = await userFactory.create({ email: "my@email.com" })
        const user = await userFactory.create({ email: "other@email.com" })
        await assert.rejects(
          async () => await userRepository.update({ where: { id: user.id }, set: { email } }),
          new ValidationException([
            { code: "not_unique", path: ["email"], message: `${email} is not unique` },
          ]),
        )
      })
    })
  })
}
