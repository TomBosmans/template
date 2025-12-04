/** biome-ignore-all lint/suspicious/noTemplateCurlyInString: It is ok here */
import assert from "node:assert"
import { describe, it } from "node:test"
import type Rule from "../ability.rule.ts"
import CaslAbility from "../casl.ability.ts"

type Action = "create" | "read" | "update" | "delete"
type RuleAction = "crud" | Action
type User = { id: string; email: string }
type Todo = {
  id: string
  title: string
  description: string
  checked: boolean
  createdById: string
}
type List = { id: string }
type Subject = {
  User: User
  Todo: Todo
  List: List
}

class Ability extends CaslAbility<Action, RuleAction, Subject, { user: User }> {
  public get resolveAction() {
    return { crud: ["create", "read", "update", "delete"] satisfies Action[] }
  }
}

describe("Ability", () => {
  it("works", () => {
    const user = { id: "24d20711-4cc9-4477-8151-dbe1776476bf", email: "test@email.com" }
    const otherUser = { id: "5f838773-94f7-44bf-bb4c-41f422052e4d", email: "other@email.com" }

    const rules = [
      { action: "read", subject: "User" },
      { action: "update", subject: "User", conditions: { id: "${user.id}" } },
      { action: "read", subject: "Todo", conditions: { createdById: "${user.id}" } },
      { action: "crud", subject: "List" },
    ] satisfies Rule<RuleAction, Subject>[]

    const ability = new Ability({
      rules,
      user,
    })

    assert.ok(ability.can("read", "User"))
    assert.ok(ability.can("update", "User"))
    assert.ok(ability.can("read", "User", user))
    assert.ok(ability.can("update", "User", user))
    assert.ok(ability.can("read", "User", otherUser))
    assert.ok(ability.cannot("update", "User", otherUser))

    assert.ok(ability.can("read", "Todo"))
    assert.ok(ability.can("read", "Todo", { createdById: user.id } as Todo))
    assert.ok(ability.cannot("read", "Todo", { createdById: otherUser.id } as Todo))

    assert.ok(ability.can("read", "List"))
    assert.ok(ability.can("update", "List"))
    assert.ok(ability.can("create", "List"))
    assert.ok(ability.can("delete", "List"))

    assert.deepStrictEqual(ability.queryFor("read", "User"), {})
    assert.deepStrictEqual(ability.queryFor("update", "User"), { $or: [{ id: user.id }] })
    assert.deepStrictEqual(ability.queryFor("read", "Todo"), { $or: [{ createdById: user.id }] })
  })
})
