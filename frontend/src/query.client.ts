import { QueryClient } from "@tanstack/react-query"
import { useHydrateAtoms } from "jotai/utils"
import { queryClientAtom } from "jotai-tanstack-query"
import tolgee from "./i18n/tolgee"
import { notificationManager } from "./notifications/notifications.state"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: (error) => {
        notificationManager.add({
          title: tolgee.t("common.title.error"),
          description: error.message,
          type: "error",
        })
        return false
      },
      staleTime: Number.POSITIVE_INFINITY,
    },
    mutations: {
      throwOnError: (error) => {
        notificationManager.add({
          title: tolgee.t("common.title.error"),
          description: error.message,
          type: "error",
        })
        return false
      },
    },
  },
})

export const HydrateAtoms = ({ children }: React.PropsWithChildren) => {
  useHydrateAtoms([[queryClientAtom, queryClient]])
  return children
}

export default queryClient
