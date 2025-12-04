import type { BasicWhere } from "#lib/repository/types.ts"

export default interface Ability<
  Action extends string,
  Subject extends Record<string, Record<string, unknown>>,
> {
  can<SubjectType extends keyof Subject>(
    action: Action,
    subjectType: SubjectType,
    subjectValue: Subject[SubjectType],
  ): boolean
  cannot<SubjectType extends keyof Subject>(
    action: Action,
    subjectType: SubjectType,
    subjectValue: Subject[SubjectType],
  ): boolean
  queryFor<SubjectType extends keyof Subject>(
    action: Action,
    subjectType: SubjectType,
  ): BasicWhere<Subject[SubjectType]>

  resolveAction: Record<string, Action[]>
}
