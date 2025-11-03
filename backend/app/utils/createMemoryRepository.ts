import { randomUUID } from "node:crypto"
import type { Insertable, Selectable, Updateable } from "kysely"
import sift from "sift"
import type { DB } from "#db/db.d.ts"
import ValidationException from "#lib/exceptions/validation.exception.ts"
import MemoryRepository from "#lib/repository/sift/crud.repository.ts"

export type Action = "create" | "update"

/**
 * Factory function that creates an in-memory repository class for a specific database table.
 *
 * This repository is meant for testing or temporary storage, not for persistent databases.
 * It extends the base `MemoryRepository` class and automatically generates common metadata
 * fields for new entities such as `id`, `createdAt`, and `updatedAt`.
 *
 * @template Table - The name of the table in the database schema (`keyof DB`).
 *
 * @param {Table} _tableName - The name of the table to create the repository for.
 *   This parameter is not used directly but helps with type inference.
 *
 * @returns {new () => MemoryRepository<Selectable<DB[Table]>, Insertable<DB[Table]>, Updateable<DB[Table]>>}
 * A dynamically generated repository class with in-memory CRUD operations for the specified table.
 *
 * @example
 * ```ts
 * const UserRepository = createMemoryRepository("users")
 * const repo = new UserRepository()
 * await repo.create({ name: "Alice" })
 * ```
 */
export default function createMemoryRepository<Table extends keyof DB>(
  _tableName: Table,
): new () => MemoryRepository<Selectable<DB[Table]>, Insertable<DB[Table]>, Updateable<DB[Table]>> {
  type Entity = Selectable<DB[Table]>
  type NewEntityDTO = Insertable<DB[Table]>
  type UpdateEntityDTO = Updateable<DB[Table]>

  return class extends MemoryRepository<Entity, NewEntityDTO, UpdateEntityDTO> {
    protected prepareNewEntity(data: NewEntityDTO) {
      const now = new Date()
      return { id: randomUUID(), createdAt: now, updatedAt: now, ...data } as Entity
    }

    protected prepareUpdatedEntity(data: UpdateEntityDTO): UpdateEntityDTO {
      return { updatedAt: new Date(), ...data }
    }

    /**
      * WARNING: DO not override this method! use #validate instead
     */
    protected validateEntity(data: Entity, action: Action): void {
      this.validate(data, action)
      const id = (data as { id: string }).id
      if (action === "create" && this.storage.find(sift.default({ id }))) {
        throw new ValidationException([
          {
            code: "not_unique",
            path: ["id"],
            message: `${id} is not unique`,
          },
        ])
      }
    }

    protected validate(_data: Entity, _action: Action) {}
  }
}
