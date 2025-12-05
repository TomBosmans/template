import createAppCommand from "#app/utils/createAppCommand.ts"
import type CLICommand from "#lib/cli/command.interface.ts"
import createZodDTO from "#lib/dto/zod.dto.ts"

const deleteUserCommand = createAppCommand({
  name: "users:delete",
  description: "Delete a user by their UUID. Provide the user's UUID as the argument.",
  schemas: { argument: createZodDTO((z) => z.string().uuid()) },
  async run({ argument, container }) {
    const userRepository = container.resolve("userRepository")
    await userRepository.delete({ where: { id: argument } })
  },
}) as CLICommand

export default deleteUserCommand
