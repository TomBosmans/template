import type { BasicWhere } from "#lib/repository/types.ts"

type Rule<
  Action extends string,
  Subject extends Record<string, Record<string, unknown>>,
  SubjectType extends keyof Subject = keyof Subject,
> = {
  subject: SubjectType
  action: Action
  conditions?: BasicWhere<Subject[SubjectType]>
}

export default Rule
