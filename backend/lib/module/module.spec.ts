import assert from "node:assert"
import { describe, it } from "node:test"
import type HTTPRoute from "#lib/http/route.ts"
import Module from "./module.ts"

describe("Module", () => {
  const UserModule = new Module({
    registry: { userService: class {}, userRepository: class {} },
    routes: [{} as HTTPRoute, {} as HTTPRoute, {} as HTTPRoute],
  })
  const SessionModule = new Module({
    registry: { sessionService: class {}, sessionRepository: class {} },
    routes: [{} as HTTPRoute, {} as HTTPRoute],
  })
  const AuthModule = new Module({
    imports: [UserModule, SessionModule],
    registry: { authService: class {} },
    routes: [{} as HTTPRoute],
  })
  const AppModule = new Module({
    imports: [AuthModule],
    registry: { appService: class {} },
    routes: [{} as HTTPRoute],
  })

  describe("#Module", () => {
    it("returns registry of itself and of all imports", () => {
      assert.strictEqual(Object.keys(AppModule.registry).length, 6)
      assert.ok(Object.keys(AppModule.registry).includes("authService"))
      assert.ok(Object.keys(AppModule.registry).includes("userService"))
      assert.ok(Object.keys(AppModule.registry).includes("userRepository"))
      assert.ok(Object.keys(AppModule.registry).includes("sessionService"))
      assert.ok(Object.keys(AppModule.registry).includes("sessionRepository"))
      assert.ok(Object.keys(AppModule.registry).includes("appService"))
    })
  })

  describe("#routes", () => {
    it("returns all routes from itself + imports", () => {
      assert.strictEqual(AppModule.routes.length, 7)
    })
  })

  describe("#imports", () => {
    it("returns all imports of itself and from the imports", () => {
      assert.strictEqual(AppModule.imports.length, 3)
    })
  })
})
