export type Edit<Entity> = Partial<Omit<Entity, "id" | "createdAt" | "updatedAt">>
export type New<Entity> = Omit<Entity, "id" | "createdAt" | "updatedAt">
export type PersistedEntity = { id: string; createdAt: Date; updatedAt: Date }

export type Where<Entity> = Partial<{
  [Key in keyof Entity]:
    | {
        $eq?: Entity[Key] | null
      }
    | Entity[Key]
    | null
}>
