import containerFactory from "./container.factory.ts"

const container = containerFactory()
const mailService = container.resolve("mailService")
const userRepository = container.resolve("userRepository")

const { id } = await userRepository.create({
  firstName: "Tom",
  lastName: "Bosmans",
  email: "tom.bosmans@email.com"
})

const user = await userRepository.findOne({
  where: { id }
})

console.log(await mailService.renderText("vercelInviteUser", { username: `${user?.firstName} ${user?.lastName}`}))
