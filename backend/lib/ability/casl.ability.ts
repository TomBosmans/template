/** biome-ignore-all lint/suspicious/noExplicitAny: It is ok here */
import {
  AbilityBuilder,
  createAliasResolver,
  createMongoAbility,
  type MongoQuery,
  type PureAbility,
  subject,
} from "@casl/ability"
import { rulesToQuery } from "@casl/ability/extra"
import type { BasicWhere } from "#lib/repository/types.ts"
import type Ability from "./ability.interface.ts"
import type Rule from "./ability.rule.ts"

export default class CaslAbility<
  Action extends string,
  RuleAction extends string,
  Subject extends Record<string, Record<string, unknown>>,
  ResolveAction extends Record<string, Action[]> = Record<string, Action[]>,
> implements Ability<Action, Subject>
{
  public get resolveAction() {
    return {} as ResolveAction
  }
  private readonly ability: PureAbility<[any, any], MongoQuery>

  constructor({ rules }: { rules: Rule<RuleAction, Subject>[] }) {
    const casl = new AbilityBuilder<typeof this.ability>(createMongoAbility)
    rules.forEach(({ action, subject, conditions }) => {
      casl.can(action, subject, conditions as any)
    })
    this.ability = casl.build({
      resolveAction: createAliasResolver(this.resolveAction),
    })
  }

  public can<SubjectType extends keyof Subject>(
    action: Action,
    subjectType: SubjectType,
    subjectValue?: Subject[SubjectType],
  ) {
    if (!subjectValue) return this.ability.can(action, subjectType)
    return this.ability.can(action, subject(subjectType as string, subjectValue))
  }

  public cannot<SubjectType extends keyof Subject>(
    action: Action,
    subjectType: SubjectType,
    subjectValue?: Subject[SubjectType],
  ) {
    if (!subjectValue) return this.ability.cannot(action, subjectType)
    return this.ability.cannot(action, subject(subjectType as string, subjectValue))
  }

  public queryFor<SubjectType extends keyof Subject>(action: Action, subjectType: SubjectType) {
    const query = rulesToQuery(this.ability, action, subjectType, (rule) =>
      rule.inverted ? { $not: rule.conditions } : rule.conditions,
    )
    return query as BasicWhere<Subject[SubjectType]>
  }
}
