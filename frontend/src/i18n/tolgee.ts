import { FormatIcu } from "@tolgee/format-icu"
import { BackendFetch, DevTools, Tolgee } from "@tolgee/react"
import config from "#config"

const tolgee = Tolgee().use(DevTools()).use(FormatIcu()).use(BackendFetch()).init({
  language: config.tolgee.languages.default,
  availableLanguages: config.tolgee.languages.available,
  apiUrl: config.tolgee.api.url,
  apiKey: config.tolgee.api.key,
})

export default tolgee
