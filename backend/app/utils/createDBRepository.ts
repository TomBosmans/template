import type { Updateable } from "kysely"
import type { DB } from "#db/db.js"
import createKyselyRepository from "#lib/repository/kysely/crud.repository.ts"

export default function createDBRepository<Table extends keyof DB>(tableName: Table) {
  return class extends createKyselyRepository(tableName) {
    protected prepareUpdatedEntity(data: Updateable<DB[Table]>) {
      return { ...data, updatedAt: new Date() }
    }
  }
}
