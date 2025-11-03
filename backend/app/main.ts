import containerFactory from "./container.factory.ts"
import NewUserDTO from "./users/dtos/newUser.dto.ts"

const container = containerFactory()
const config = container.resolve("config")
const userRepository = container.resolve("userRepository")

const newUserData = new NewUserDTO({
  firstName: "Tom",
  lastName: "Bosmans",
  email: "tom.94.bosmans@gmail.com",
  password: "string"
})

newUserData.this

console.log(newUserData.constructor.attributes)
console.log(await userRepository.createOne(newUserData.parsed))

console.log(await userRepository.findMany())
console.log(config)
