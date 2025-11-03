import type { Insertable, Kysely, Selectable, Updateable } from "kysely"
import type { DB } from "#db/db.js"
import RecordNotFoundException from "#lib/exceptions/recordNotFound.exception.ts"
import ValidationException from "#lib/exceptions/validation.exception.ts"
import type CrudRepository from "../crudRepository.interface.ts"
import countQuery from "./queries/count.query.ts"
import deleteQuery, { type DeleteQueryParams } from "./queries/delete.query.ts"
import insertQuery, {
  type InsertManyQueryParams,
  type InsertOneQueryParams,
} from "./queries/insert.query.ts"
import selectQuery, { type SelectQueryParams } from "./queries/select.query.ts"
import updateQuery, { type UpdateQueryParams } from "./queries/update.query.ts"

export default function createKyselyRepository<Table extends keyof DB>(table: Table) {
  type Entity = Selectable<DB[Table]>
  type NewEntityDTO = Insertable<DB[Table]>
  type UpdateEntityDTO = Updateable<DB[Table]>

  return class KyselyRepository implements CrudRepository<Entity, NewEntityDTO, UpdateEntityDTO> {
    private readonly db: Kysely<DB>

    constructor(params: { db: Kysely<DB> }) {
      this.db = params.db
    }

    async findMany(params = {}) {
      const query = selectQuery(table, params as SelectQueryParams<Table>, this.db)
      const records = await query.execute()
      return records as Entity[]
    }

    async findOne(params: unknown) {
      const record =
        (await selectQuery(
          table,
          params as SelectQueryParams<Table>,
          this.db,
        ).executeTakeFirst()) ?? null
      return record as Entity
    }

    async findOneOrThrow(params: unknown) {
      const record = await selectQuery(
        table,
        params as SelectQueryParams<Table>,
        this.db,
      ).executeTakeFirst()
      if (record) return record as Entity

      throw new RecordNotFoundException({
        entity: table,
        condition: (params as SelectQueryParams<Table>).where,
      })
    }

    async count(params: unknown) {
      const query = countQuery(
        selectQuery(table, params as Pick<SelectQueryParams<Table>, "where">, this.db),
      )
      const records = await query.executeTakeFirst()
      return records?.count || 0
    }

    public async createOne(params: unknown) {
      try {
        const [record] = await insertQuery(
          table,
          this.prepareNewEntity(params as InsertOneQueryParams<Table>),
          this.db,
        ).execute()
        return record as Entity
      } catch (error) {
        this.handleError(error)
      }
    }

    public async createMany(params: unknown) {
      try {
        const records = await insertQuery(
          table,
          (params as InsertManyQueryParams<Table>).map((p) => this.prepareNewEntity(p)),
          this.db,
        ).execute()
        return records as Entity[]
      } catch (error) {
        this.handleError(error)
      }
    }

    public async update(params: unknown) {
      try {
        const { set, where } = params as UpdateQueryParams<Table>
        const records = await updateQuery(
          table,
          { set: this.prepareUpdatedEntity(set), where },
          this.db,
        ).execute()
        return records as Entity[]
      } catch (error) {
        this.handleError(error)
      }
    }

    public async delete(params: unknown) {
      await deleteQuery(table, params as DeleteQueryParams<Table>, this.db).execute()
    }

    private handleError(error: unknown): never {
      if (!error) throw error
      if (typeof error !== "object") throw error
      if (!("code" in error)) throw error

      const details = this.extractDetailFromError(error)

      if (error.code === "23505") {
        throw new ValidationException([
          {
            code: "not_unique",
            path: [details[1]],
            message: `${details[2]} is not unique`,
          },
        ])
      }
      throw error
    }

    private extractDetailFromError(error: Record<string, unknown>) {
      if (!("detail" in error)) return []
      if (typeof error.detail !== "string") return []
      return error.detail.match(/Key \(([^)]+)\)=\(([^)]+)\)/) || []
    }

    protected prepareNewEntity(newEntityDTO: NewEntityDTO): NewEntityDTO {
      return newEntityDTO
    }

    protected prepareUpdatedEntity(updateEntityDTO: UpdateEntityDTO): UpdateEntityDTO {
      return updateEntityDTO
    }

    // biome-ignore lint/suspicious/noExplicitAny: It is ok here.
  } as any as new () => CrudRepository<Entity, NewEntityDTO, UpdateEntityDTO>
}
