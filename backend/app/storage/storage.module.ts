import Module from "#lib/module/module.ts"
import s3StorageFactory from "#lib/storage/s3.storage.ts"
import policy from "./storage.policy.ts"

const StorageModule = new Module({
  registry: { storage: s3StorageFactory(policy) },
})

export default StorageModule
