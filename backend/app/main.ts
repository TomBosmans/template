import containerFactory from "./container.factory.ts"

const container = containerFactory()
const config = container.resolve("config")
console.log(config)
