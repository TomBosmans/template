import assert from "node:assert"
import { before, describe, it } from "node:test"
import Argon2Hasher from "./argon2.hahser.ts"
import type Hasher from "./interface.ts"

for (const Hasher of [Argon2Hasher]) {
  describe(`${Hasher.name}`, () => {
    let hashService: Hasher

    before(() => {
      hashService = new Hasher()
    })

    describe("#hash", () => {
      it("hashes a value", async () => {
        const value = "my-secret-password"
        const hashed = await hashService.hash(value)

        assert.ok(typeof hashed === "string")
        assert.notEqual(hashed, value)
        assert.ok(hashed.length > 20)
      })
    })

    describe("#verify", () => {
      it("returns false when value doesn't match", async () => {
        const value = "my-secret-password"
        const hashed = await hashService.hash(value)
        const isValid = await hashService.verify(hashed, "other-password")

        assert.notEqual(isValid, true)
      })

      it("returns true when value matches", async () => {
        const value = "my-secret-password"
        const hashed = await hashService.hash(value)
        const isValid = await hashService.verify(hashed, value)

        assert.strictEqual(isValid, true)
      })
    })
  })
}
