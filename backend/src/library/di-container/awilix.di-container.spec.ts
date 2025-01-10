import assert from "node:assert"
import { beforeEach, describe, it } from "node:test"
import AwilixContainer from "./awilix.di-container.ts"
import type DIContainer from "./interface.ts"

describe("AwilixContainer", () => {
  let container: DIContainer
  const myValue = "hello world"
  const myFunction = ({ myValue }: { myValue: string }) => myValue
  class MyClass {
    public readonly value: string

    constructor({ myFunction }: { myFunction: string }) {
      this.value = myFunction
    }
  }

  beforeEach(() => {
    container = new AwilixContainer()
    container.register(myValue, { name: "myValue", type: "value" })
    container.register(myFunction, { name: "myFunction", type: "function" })
    container.register(MyClass, { name: "myClass", type: "class" })
  })

  describe("#resolve", () => {
    it("can register and resolve a value", () => {
      assert.equal(container.resolve("myValue"), myValue)
    })

    it("can register and resolve a function", () => {
      assert.equal(container.resolve("myFunction"), myFunction({ myValue }))
    })

    it("can register and resolve a class", () => {
      assert.equal(
        container.resolve<MyClass>("myClass").value,
        new MyClass({ myFunction: myFunction({ myValue }) }).value,
      )
    })
  })

  describe("#build", () => {
    it("can register and build a function", () => {
      assert.equal(container.build(myFunction), myFunction({ myValue }))
    })

    it("can register and build a class", () => {
      assert.equal(
        container.build(MyClass).value,
        new MyClass({ myFunction: myFunction({ myValue }) }).value,
      )
    })
  })
})
