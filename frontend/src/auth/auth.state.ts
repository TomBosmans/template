import { atom } from "jotai"
import { atomWithMutation, atomWithQuery, queryClientAtom } from "jotai-tanstack-query"
import { type PostSignInData, type PostSignUpData, postSignIn, postSignUp } from "../client"
import {
  deleteSignOutMutation,
  getProfileOptions,
  postSignInMutation,
  postSignUpMutation,
} from "../client/@tanstack/react-query.gen"
import { useMutationAtom } from "../common/hooks/useMutationAtom"

export const profileAtom = atomWithQuery(() => getProfileOptions())

export const signUpAtom = atomWithMutation(() => ({
  mutationKey: postSignUpMutation().mutationKey,
  mutationFn: async (body: PostSignUpData["body"]) => postSignUp({ body }),
}))
export const useSignUp = () => useMutationAtom(signUpAtom)

export const signOutAtom = atomWithMutation((get) => ({
  ...deleteSignOutMutation(),
  onSuccess: () => {
    const queryClient = get(queryClientAtom)
    queryClient.invalidateQueries({ queryKey: getProfileOptions().queryKey })
  },
}))

export const signInAtom = atomWithMutation((get) => ({
  mutationKey: postSignInMutation().mutationKey,
  mutationFn: async (params: PostSignInData["body"]) => {
    const result = await postSignIn({ body: params })

    const queryClient = get(queryClientAtom)
    queryClient.setQueryData(getProfileOptions().queryKey, result.data)

    return result
  },
}))

export const isAuthenticatedAtom = atom((get) => {
  return !!get(profileAtom).data
})
