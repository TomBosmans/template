import { atom } from "jotai"
import { atomWithDefault } from "jotai/utils"
import z from "zod"
import tolgee from "./tolgee"

const languageStoreAtom = atomWithDefault(() => tolgee.getLanguage())
export const languageAtom = atom(
  (get) => get(languageStoreAtom),
  (_get, set, language: string) => {
    set(languageStoreAtom, language)
    z.config(z.locales[language as keyof typeof z.locales]?.())
    tolgee.changeLanguage(language)
  },
)
