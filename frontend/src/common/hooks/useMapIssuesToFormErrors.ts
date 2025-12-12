/** biome-ignore-all lint/suspicious/noExplicitAny: It is ok here */
import type z from "zod"
import type { BackendIssue } from "../../axios"
import useI18n from "../../i18n/I18n.hook"

type Value = Record<string, string | number | bigint | boolean | Date | null | undefined>

export default function useMapIssuesToFormErrors(namespace?: string) {
  const { t } = useI18n()

  return (issues: z.ZodError["issues"] | BackendIssue[], values: Value) => {
    const fields = issues.reduce(
      (fields, issue) => {
        const key = issue.path.join(".")
        const common = [
          "common",
          "errors",
          (issue as any).origin,
          (issue as any).format,
          issue.code,
        ]
          .filter(Boolean)
          .join(".")
        const params = { ...(issue as any), value: values[key], key: t(`${namespace}.${key}`) }
        fields[key] = t(
          `${namespace}.errors.${key}.${issue.code}`,
          t(common, issue.message, params),
          params,
        )
        return fields
      },
      {} as Record<string, string>,
    )

    return { fields }
  }
}
