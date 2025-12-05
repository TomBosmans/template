import createAppCommand from "#app/utils/createAppCommand.ts"
import type CLICommand from "#lib/cli/command.interface.ts"
import { NewUserDTO, UserDTO } from "../user.dtos.ts"

const createUserCommand = createAppCommand({
  name: "users:create",
  description: "Create a new user with the specified options (e.g., email, firstName, lastName, password).",
  schemas: { options: NewUserDTO },

  async run({ options, container }) {
    const userRepository = container.resolve("userRepository")
    const logger = container.resolve("logger")
    const hasher = container.resolve("hasher")
    const user = await userRepository.createOne({
      ...options,
      password: await hasher.hash(options.password),
    })
    logger.info("user created", UserDTO.parse(user))
  },
}) as CLICommand

export default createUserCommand
