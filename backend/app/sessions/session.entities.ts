import type { Insertable, Selectable, Updateable } from "kysely";
import type { DB } from "#db/db.js";

export type Session = Selectable<DB["sessions"]>
export type NewSession = Insertable<DB["sessions"]>
export type EditSession = Updateable<DB["sessions"]>
