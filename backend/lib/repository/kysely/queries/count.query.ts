import { sql } from "kysely"
import type { DB } from "#db/db.js"
import type { SelectQuery } from "../types.ts"

export default function countQuery<Table extends keyof DB>(eb: SelectQuery<Table>) {
  return eb.clearSelect().clearOrderBy().select(sql<number>`count(*)::int`.as("count"))
}
