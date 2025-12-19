import { useAtomValue } from "jotai"
import { atomWithQuery } from "jotai-tanstack-query"
import type { GetUsersResponse } from "../client"
import { getUsersOptions } from "../client/@tanstack/react-query.gen"

export type User = GetUsersResponse["data"][number]
export const usersAtom = atomWithQuery(() => getUsersOptions())
export const useUsers = () => useAtomValue(usersAtom)?.data?.data || []
