import { useTranslate } from "@tolgee/react"

export default function useI18n() {
  const { t } = useTranslate()
  return { t }
}
