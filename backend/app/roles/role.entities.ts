import type { Action, Subject } from "#app/app.ability.ts"
import type AbilityRule from "#lib/ability/ability.rule.ts"

export type RuleAction = "crud" | Action
export type Rule = AbilityRule<RuleAction, Subject>
export type Role = { name: string; rules: Rule[] }
