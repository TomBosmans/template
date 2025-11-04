import { randomUUID } from "node:crypto"
import containerFactory from "./container.factory.ts"
import { NewUserDTO } from "./users/user.dtos.ts"

const container = containerFactory()
const userRepository = container.resolve("userRepository")
const db = container.resolve("db")

await userRepository.truncate()
const newUserData = NewUserDTO.parse({
  firstName: "Tom",
  lastName: "Bosmans",
  email: "tom.94.bosmans@gmail.com",
  password: "string",
})

await userRepository.findMany()

const scopeA = container.createScope()
scopeA.register({ id: randomUUID(), source: "scopeA" }, { name: "trace", type: "value" })
await scopeA.resolve("userRepository").findMany()

const scopeB = container.createScope()
scopeB.register({ id: randomUUID(), source: "scopeB" }, { name: "trace", type: "value" })
await scopeB.resolve("userRepository").createOne(newUserData)

console.log(await db.connections())
await db.truncateAll()
