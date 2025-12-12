import { QueryClient } from "@tanstack/react-query"
import { useHydrateAtoms } from "jotai/utils"
import { queryClientAtom } from "jotai-tanstack-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
      staleTime: Number.POSITIVE_INFINITY,
    },
  },
})

export const HydrateAtoms = ({ children }: React.PropsWithChildren) => {
  useHydrateAtoms([[queryClientAtom, queryClient]])
  return children
}

export default queryClient
