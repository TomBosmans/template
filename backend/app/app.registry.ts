import type RegistryFor from "#lib/di/registryFor.type.ts"
import type AppModule from "./app.module.ts"

type AppRegistry = RegistryFor<typeof AppModule.registry>
export default AppRegistry
