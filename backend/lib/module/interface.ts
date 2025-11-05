import type ClassType from "#lib/types/class.type.ts"

export default interface Module {
  imports?: Module[]
  appRegistry?: Record<string, ClassType>
  testRegistry?: Record<string, ClassType>
  routes?: Array<Record<string, unknown>>
}
