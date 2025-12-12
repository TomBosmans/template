import type { AxiosError, AxiosResponse } from "axios"
import { type Atom, useAtomValue } from "jotai"
import type { AtomWithMutationResult } from "jotai-tanstack-query"
import type { BackendIssue } from "../../axios"

export function useMutationAtom<
  A extends
    | (AxiosResponse & { error: undefined })
    | (AxiosError & { data: undefined; error: unknown }),
  B,
  C,
  D,
>(atom: Atom<AtomWithMutationResult<A, B, C, D>>) {
  const mutation = useAtomValue(atom)

  return async (
    data: C,
  ): Promise<{ success: true; data: A["data"] } | { success: false; issues: BackendIssue[] }> => {
    const response = await mutation.mutateAsync(data)
    if (response.status === 400) return { success: false, issues: response.error as BackendIssue[] }
    return { success: true, data: response.data }
  }
}
