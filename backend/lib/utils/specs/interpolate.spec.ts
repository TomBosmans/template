/** biome-ignore-all lint/suspicious/noTemplateCurlyInString: It is ok here */
import assert from "node:assert"
import { describe, it } from "node:test"
import interpolate from "../interpolate.ts"

describe("interpolate", () => {
  it("should interpolate variables in the template", () => {
    const template = '{"name": "${user.name}", "id": "${user.id}" }'
    const vars = { user: { name: "John Doe", id: 2 } }

    const result = interpolate(template, vars)

    assert.deepStrictEqual(result, { name: "John Doe", id: 2 })
  })

  it("should not interpolate non-variable values", () => {
    const template = '{"name": "John Doe", "id": 2}'
    const vars = { user: { name: "Jane Doe", id: 2 } }

    const result = interpolate(template, vars)

    assert.deepStrictEqual(result, { name: "John Doe", id: 2 })
  })

  it("should throw ReferenceError for empty template", () => {
    const template = ""
    const vars = {}

    assert.throws(() => interpolate(template, vars), new ReferenceError("Empty template"))
  })

  it("should throw ReferenceError for undefined variables", () => {
    const template = '{ "name": "${user.name}", "id": "${user.id}" }'
    const vars = { user: { name: "John Doe" } }

    assert.throws(
      () => interpolate(template, vars),
      new ReferenceError("Variable user.id is not defined"),
    )
  })
})
