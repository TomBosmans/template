import type RegistryFor from "#lib/di/registryFor.type.ts"
import type TestModule from "./test.module.ts"

type TestRegistry = RegistryFor<typeof TestModule.registry>
export default TestRegistry
