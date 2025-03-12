import { atom } from "jotai";
import { type Notification } from "./types"


export const openAtom = atom(false)

const notificationStateAtom = atom<Notification | undefined>()
export const notificationAtom = atom(
  (get) => get(notificationStateAtom),
  (_, set, value: Notification) => {
    set(openAtom, true)
    set(notificationStateAtom, value)
  }
)
