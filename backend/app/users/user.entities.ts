import type { Insertable, Selectable, Updateable } from "kysely"
import type { DB } from "#db/db.js"

export type User = Selectable<DB["users"]>
export type NewUser = Insertable<DB["users"]>
export type EditUser = Updateable<DB["users"]>
