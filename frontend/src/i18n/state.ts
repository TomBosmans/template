import { atom } from "jotai"
import { atomWithDefault } from "jotai/utils"
import tolgee from "./tolgee"

const languageStoreAtom = atomWithDefault(() => tolgee.getLanguage())
export const languageAtom = atom(
  (get) => get(languageStoreAtom),
  (_get, set, language: string) => {
    set(languageStoreAtom, language)
    tolgee.changeLanguage(language)
  },
)
