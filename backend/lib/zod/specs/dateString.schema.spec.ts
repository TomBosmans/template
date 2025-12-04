import assert from "node:assert"
import { describe, it } from "node:test"
import dateStringSchema from "../dateString.schema.ts"

describe("dateStringSchema", () => {
  it("accepts iso datetime string", () => {
    const date = dateStringSchema.parse(new Date("2025-01-02").toISOString())
    assert.strictEqual(date, new Date("2025-01-02").toISOString())
  })

  it("accepts date", () => {
    const date = dateStringSchema.parse(new Date("2025-01-02"))
    assert.strictEqual(date, new Date("2025-01-02").toISOString())
  })

  it("accepts iso datetime with offset", () => {
    const date = dateStringSchema.parse("2025-11-11T16:11:39.968607+00:00")
    assert.strictEqual(date, "2025-11-11T16:11:39.968607+00:00")
  })

  it("does not except random string", () => {
    assert.throws(() => dateStringSchema.parse("random"))
  })
})
