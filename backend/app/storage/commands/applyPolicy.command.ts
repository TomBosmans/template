import createAppCommand from "#app/utils/createAppCommand.ts"
import type CLICommand from "#lib/cli/command.interface.ts"
import policy from "../storage.policy.ts"

const applyPolicyCommand = createAppCommand({
  name: "storage:apply-policy",
  description: "Apply the latest storage policy to the configured S3 bucket",
  async run({ container }) {
    const storage = container.resolve("storage")
    const config = container.resolve("config")
    await storage.applyPolicy(policy(config.s3.bucket))
  },
}) as CLICommand

export default applyPolicyCommand
