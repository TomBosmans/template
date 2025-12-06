import { useAtom } from "jotai"
import config from "#config"
import { languageAtom } from "./state"

export const I18nSelector = () => {
  const [language, setLanguage] = useAtom(languageAtom)

  return (
    <select onChange={(e) => setLanguage(e.target.value)} value={language}>
      {config.tolgee.languages.available.map((language) => (
        <option key={language}>{language}</option>
      ))}
    </select>
  )
}
