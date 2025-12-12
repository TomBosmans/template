import { useTranslate } from "@tolgee/react"

export default function useI18n(namespace?: string) {
  const { t } = useTranslate(namespace)
  return { t }
}
