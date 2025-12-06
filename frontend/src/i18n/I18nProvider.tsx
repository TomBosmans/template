import { TolgeeProvider } from "@tolgee/react"
import type { PropsWithChildren } from "react"
import tolgee from "./tolgee"

export default function I18nProvider({ children }: PropsWithChildren) {
  return <TolgeeProvider tolgee={tolgee}>{children}</TolgeeProvider>
}
