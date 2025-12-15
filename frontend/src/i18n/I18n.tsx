import { type ParamsTags, T, type TranslateParams, type TranslationKey } from "@tolgee/react"

export default function I18n(props: {
  keyName: TranslationKey
  params?: TranslateParams | TranslateParams<ParamsTags>
  default?: string
}) {
  return <T keyName={props.keyName} params={props.params} defaultValue={props.default} />
}
