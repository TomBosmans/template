import { testContainerFactory } from "./container.factory.ts"

const container = testContainerFactory()
const userRepository = container.resolve("userRepository")
const sessionRepository = container.resolve("sessionRepository")

const sessionFactory = container.resolve("sessionFactory")

await sessionFactory.create()

console.log(sessionFactory.build())

console.log(await userRepository.findMany())
console.log(await sessionRepository.findMany())
