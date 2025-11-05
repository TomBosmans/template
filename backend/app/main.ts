import containerFactory from "./container.factory.ts"

const container = containerFactory()
const userRepository = container.resolve("userRepository")
const sessionRepository = container.resolve("sessionRepository")

const users = await userRepository.findMany()
const sessions = await sessionRepository.findMany()
console.log(users)
console.log(sessions)
