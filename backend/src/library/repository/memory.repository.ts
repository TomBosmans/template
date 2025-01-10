import crypto from "node:crypto"
import sift from "sift"
import type Repository from "./interface.ts"
import type { Edit, New, PersistedEntity, Where } from "./types.ts"

export default class MemoryRepository<Entity extends PersistedEntity>
  implements Repository<Entity>
{
  public data: Entity[] = []

  public async findOne(params: { where?: Where<Entity> } = {}) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    return this.data.find((sift as any)(params.where as any)) || null
  }

  public async findMany(params: { where?: Where<Entity> } = {}) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    return params.where ? this.data.filter((sift as any)(params.where as any)) : this.data
  }

  public async delete(params: { where?: Where<Entity> } = {}) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    this.data = this.data.filter((sift as any)({ $not: params.where as any }))
  }

  public async update(params: { where?: Where<Entity>; data: Edit<Entity> }) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const index = this.data.findIndex((sift as any)(params.where as any))
    this.data[index] = { ...this.data[index], ...params.data, updatedAt: new Date() }
    return this.data[index]
  }

  public async create(newEntity: New<Entity>) {
    const date = new Date()
    const record = {
      id: crypto.randomUUID(),
      updatedAt: date,
      createdAt: date,
      ...newEntity,
    } as Entity
    this.data.push(record)
    return record
  }
}
