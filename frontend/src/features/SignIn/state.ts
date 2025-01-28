import { atom } from "jotai"
import { type FieldValues, errorsAtom, valuesAtom } from "./form"

export const handleSignInAtom = atom(null, (_get, _set, data: FieldValues) => {
  console.log(data)
})

export const handleSignUpAtom = atom(null, () => {
  console.log("redirect to sign up")
})

export const handleForgotPasswordAtom = atom(null, () => {
  console.log("redirect to forgot password")
})

export const signInValuesAtom = valuesAtom
export const signInErrorsAtom = errorsAtom
