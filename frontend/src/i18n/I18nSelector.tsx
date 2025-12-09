import { useTranslate } from "@tolgee/react"
import { Select } from "components"
import { useAtom } from "jotai"
import config from "#config"
import { languageAtom } from "./state"

export default function I18nSelector() {
  const [language, setLanguage] = useAtom(languageAtom)
  const { t } = useTranslate()

  const options = config.tolgee.languages.available.map((language) => ({
    value: language,
    label: t(`language.${language}`),
  }))

  const handleValueChange = (value: string) => {
    if (value) setLanguage(value)
  }

  return (
    <Select
      value={language}
      options={options}
      onValueChange={handleValueChange}
    />
  )
}
