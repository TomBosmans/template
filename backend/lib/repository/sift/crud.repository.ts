import sift from "sift"
import RecordNotFoundException from "#lib/exceptions/recordNotFound.exception.ts"
import type Obj from "#lib/types/obj.type.ts"
import type CrudRepository from "../crudRepository.interface.ts"
import type {
  CountQueryParams,
  DeleteQueryParams,
  InsertQueryParams,
  SelectQueryParams,
  UpdateQueryParams,
} from "../types.ts"

export default class MemoryRepository<
  Entity extends Obj,
  NewEntityDTO extends Obj,
  UpdateEntityDTO extends Obj,
> implements CrudRepository<Entity, NewEntityDTO, UpdateEntityDTO>
{
  protected storage: Entity[] = []

  public findMany({ where, limit, offset, orderBy }: SelectQueryParams<Entity> = {}) {
    let result = this.storage

    // biome-ignore lint/suspicious/noExplicitAny: It is ok
    if (where) result = result.filter(sift.default(where as any))
    if (orderBy) {
      const keys = Object.keys(orderBy) as (keyof Entity)[]
      result = [...result].sort((a, b) => {
        for (const key of keys) {
          const direction = orderBy[key]
          const comparison = a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0
          if (comparison !== 0) return direction === "desc" ? -comparison : comparison
        }
        return 0
      })
    }
    if (offset) result = result.slice(offset)
    if (limit) result = result.slice(0, limit)

    return result
  }

  public findOne(params: SelectQueryParams<Entity>) {
    return this.findMany(params)[0] || null
  }

  public findOneOrThrow(params: SelectQueryParams<Entity>) {
    const record = this.findMany(params)[0]
    if (record) return record

    throw new RecordNotFoundException({ entity: "unknown", condition: params.where })
  }

  public count(params: CountQueryParams<Entity>) {
    // biome-ignore lint/suspicious/noExplicitAny: It is ok
    return this.storage.filter(sift.default(params.where as any)).length
  }

  public createOne(newRecord: InsertQueryParams<NewEntityDTO>) {
    const record = this.prepareNewEntity(newRecord)
    this.validateEntity(record, "create")
    this.storage.push(record)
    return record
  }

  public createMany(newRecords: Array<InsertQueryParams<NewEntityDTO>>) {
    const records = newRecords.map((newRecord) => {
      const record = this.prepareNewEntity(newRecord)
      this.validateEntity(record, "create")
      return record
    })

    this.storage.push(...records)
    return records
  }

  public update(params: UpdateQueryParams<Entity, UpdateEntityDTO>) {
    const updatedRecords: Entity[] = []
    this.storage = this.storage.map((record) => {
      if (sift.default(params)(record)) {
        const updatedRecord = { ...record, ...this.prepareUpdatedEntity(params.set) }
        this.validateEntity(updatedRecord, "update")
        updatedRecords.push(updatedRecord)
        return updatedRecord
      }
      return record
    })

    return updatedRecords
  }

  public delete(params: DeleteQueryParams<Entity>) {
    for (let index = this.storage.length - 1; index >= 0; index--) {
      if (sift.default(params)(this.storage[index])) {
        this.storage.splice(index, 1)
      }
    }
  }

  protected prepareNewEntity(_newEntityDTO: NewEntityDTO): Entity {
    throw Error("this is not implemented")
  }

  protected prepareUpdatedEntity(updateEntityDTO: UpdateEntityDTO): UpdateEntityDTO {
    return updateEntityDTO
  }

  protected validateEntity(_data: Entity, _action: "create" | "update"): void {}
}
