import containerFactory from "./container.factory.ts"

const container = containerFactory()
const config = container.resolve("config")
const db = container.resolve("db")

console.log(await db.selectFrom("users").selectAll().execute())
console.log(config)
