import assert from "node:assert"
import { describe, it } from "node:test"
import z from "zod"
import getType from "../getType.ts"

describe("getType", () => {
  it("returns object", () => assert.strictEqual(getType(z.object({})), "object"))
  it("returns string", () => assert.strictEqual(getType(z.string()), "string"))
  it("returns number", () => assert.strictEqual(getType(z.number()), "number"))
  it("returns boolean", () => assert.strictEqual(getType(z.boolean()), "boolean"))
  it("returns array", () => assert.strictEqual(getType(z.array(z.string())), "array"))
  it("returns union", () => assert.strictEqual(getType(z.union([z.string(), z.number()])), "union"))
  it("returns literal", () => assert.strictEqual(getType(z.literal("test")), "literal"))
  it("returns enum", () => assert.strictEqual(getType(z.enum(["a", "b"])), "enum"))
  it("returns optional", () =>
    assert.strictEqual(getType(z.string().optional()), "optional(string)"))
  it("returns nullable", () =>
    assert.strictEqual(getType(z.number().nullable()), "nullable(number)"))
  it("returns default", () =>
    assert.strictEqual(getType(z.boolean().default(true)), "default(boolean)"))
  it("returns tuple", () => assert.strictEqual(getType(z.tuple([z.string(), z.number()])), "tuple"))
  it("returns record", () => assert.strictEqual(getType(z.record(z.string())), "record"))
  it("returns intersection", () =>
    assert.strictEqual(getType(z.intersection(z.string(), z.string())), "intersection"))
  it("returns map", () => assert.strictEqual(getType(z.map(z.string(), z.number())), "map"))
  it("returns set", () => assert.strictEqual(getType(z.set(z.string())), "set"))
  it("returns unknown for unrecognized schema", () =>
    // biome-ignore lint/suspicious/noExplicitAny: needed
    assert.strictEqual(getType({} as any), "unknown"))
})
