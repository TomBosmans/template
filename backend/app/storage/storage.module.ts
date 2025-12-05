import Module from "#lib/module/module.ts"
import S3Storage from "#lib/storage/s3.storage.ts"
import applyPolicyCommand from "./commands/applyPolicy.command.ts"

const StorageModule = new Module({
  registry: { storage: S3Storage },
  commands: [applyPolicyCommand],
})

export default StorageModule
