import assert from "node:assert"
import { describe, it } from "node:test"
import typeOf from "../typeOf.ts"

describe("typeOf", () => {
  it("should identify plain values as 'value'", () => {
    assert.strictEqual(typeOf(42), "value")
    assert.strictEqual(typeOf("hello"), "value")
    assert.strictEqual(typeOf({}), "value")
    assert.strictEqual(typeOf([]), "value")
    assert.strictEqual(typeOf(null), "value")
    assert.strictEqual(typeOf(undefined), "value")
  })

  it("should identify functions as 'function'", () => {
    function regularFunction() {}
    const arrowFunction = () => {}
    const asyncFunction = async () => {}
    const generatorFunction = function* () {}

    assert.strictEqual(typeOf(regularFunction), "function")
    assert.strictEqual(typeOf(arrowFunction), "function")
    assert.strictEqual(typeOf(asyncFunction), "function")
    assert.strictEqual(typeOf(generatorFunction), "function")
  })

  it("should identify classes as 'class'", () => {
    class MyClass {}
    assert.strictEqual(typeOf(MyClass), "class")
  })
})
