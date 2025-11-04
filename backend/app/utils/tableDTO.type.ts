import type { Insertable, Selectable, Updateable } from "kysely"
import type { DB } from "#db/db.js"

type TableDTO<
  TYPE extends "entity" | "new" | "update",
  Table extends keyof DB,
> = TYPE extends "entity"
  ? Selectable<DB[Table]>
  : TYPE extends "new"
    ? Insertable<DB[Table]>
    : TYPE extends "update"
      ? Updateable<DB[Table]>
      : never
export default TableDTO
