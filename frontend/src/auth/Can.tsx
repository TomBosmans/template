import { subject } from "@casl/ability"
import type { AppAction, AppSubjectMap } from "./ability"
import { useAbility } from "./auth.state"

export type CanProps<SubjectKey extends keyof AppSubjectMap> = React.PropsWithChildren<{
  I: AppAction
  a: SubjectKey
  this?: AppSubjectMap[SubjectKey]
}>

export default function Can<SubjectKey extends keyof AppSubjectMap>(props: CanProps<SubjectKey>) {
  const ability = useAbility()
  if (!ability) return null

  if (!props.this) return <>{ability.can(props.I, props.a) && props.children}</>
  return (
    <>{ability.can(props.I, subject(props.a, subject(props.a, props.this))) && props.children}</>
  )
}
