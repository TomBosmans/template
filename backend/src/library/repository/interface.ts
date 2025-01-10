import type { Edit, New, PersistedEntity, Where } from "./types.ts"

export default interface Repository<Entity extends PersistedEntity> {
  findOne: (params?: { where?: Where<Entity> }) => Promise<Entity | null>
  findMany: (params?: { where?: Where<Entity> }) => Promise<Entity[]>
  create: (newEntity: New<Entity>) => Promise<Entity>
  delete: (params?: { where?: Where<Entity> }) => Promise<void>
  update: (params: { where?: Where<Entity>; data: Edit<Entity> }) => Promise<Entity>
}
