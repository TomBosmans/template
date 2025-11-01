import type { SelectQueryBuilder } from "kysely"
import type { DB } from "#db/db.js"

// biome-ignore lint/suspicious/noExplicitAny: It is ok
export type SelectQuery<_Table extends keyof DB> = SelectQueryBuilder<DB, any, object>
