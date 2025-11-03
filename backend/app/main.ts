import containerFactory from "./container.factory.ts"
import { NewUserDTO } from "./users/user.dtos.ts"

const container = containerFactory()
const config = container.resolve("config")
const userRepository = container.resolve("userRepository")

const newUserData = NewUserDTO.parse({
  firstName: "Tom",
  lastName: "Bosmans",
  email: "tom.94.bosmans@gmail.com",
  password: "string"
})

console.log(NewUserDTO.attributes)
console.log(await userRepository.createOne(newUserData))

console.log(await userRepository.findMany())
console.log(config)
