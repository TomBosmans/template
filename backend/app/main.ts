import containerFactory from "./container.factory.ts"

const container = containerFactory()
const config = container.resolve("config")
const userRepository = container.resolve("userRepository")
const db = container.resolve("db")

console.log(await userRepository.findMany())
console.log(config)
