import assert from "node:assert"
import { before, describe, it } from "node:test"
import containerFactory from "#app/container.factory.ts"
import RoleModule from "../role.module.ts"
import type RoleRepository from "../role.repository.ts"

describe("RoleRepository", () => {
  let roleRepository: RoleRepository

  before(() => {
    const container = containerFactory(RoleModule)
    roleRepository = container.resolve("roleRepository")
  })

  describe("#fineOne", () => {
    it("can find the user role", () => {
      const role = roleRepository.findOne({ where: { name: "user" } })
      assert.strictEqual(role?.name, "user")
    })

    it("can find the admin role", () => {
      const role = roleRepository.findOne({ where: { name: "admin" } })
      assert.strictEqual(role?.name, "admin")
    })

    it("returns null if no role if found", () => {
      // biome-ignore lint/suspicious/noExplicitAny: Needed to test this
      const role = roleRepository.findOne({ where: { name: "does not exist" as any } })
      assert.strictEqual(role, null)
    })
  })
})
