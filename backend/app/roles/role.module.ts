import Module from "#lib/module/module.ts"
import RoleRepository from "./role.repository.ts"

const RoleModule = new Module({
  registry: { roleRepository: RoleRepository },
})

export default RoleModule
