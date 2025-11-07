import Module from "#lib/module/module.ts"
import DatabaseService from "./database.service.ts"

const DatabaseModule = new Module({
  registry: { db: DatabaseService },
})

export default DatabaseModule
