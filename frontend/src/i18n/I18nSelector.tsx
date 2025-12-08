import { useTranslate } from "@tolgee/react"
import { useAtom } from "jotai"
import config from "#config"
import Select from "../common/components/Select/Select"
import { languageAtom } from "./state"

export const I18nSelector = () => {
  const [language, setLanguage] = useAtom(languageAtom)
  const { t } = useTranslate()

  const options = config.tolgee.languages.available.map((language) => ({
    value: language,
    label: t(`language.${language}`),
  }))

  return (
    <Select
      options={options}
      value={language}
      onValueChange={(value) => value && setLanguage(value)}
    />
  )
}
