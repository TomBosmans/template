import AwilixContainer from "#lib/di/awilix.container.ts"
import type DIContainer from "#lib/di/container.interface.ts"
import type DIRegistry from "#lib/di/registry.type.ts"
import type RegistryFor from "#lib/di/registryFor.type.ts"
import type Module from "#lib/module/module.ts"
import typeOf from "#lib/utils/typeOf.ts"

export default function containerFactory<
  Registry extends DIRegistry,
  // biome-ignore lint/suspicious/noExplicitAny: It is ok here
  Imports extends Module<any, any>[],
>(mod: Module<Registry, Imports>) {
  const container = new AwilixContainer()
  container.register({}, { name: "trace", type: "value" })

  for (const [name, registry] of Object.entries(mod.registry)) {
    container.register(registry, { name, type: typeOf(registry) })
  }

  return container as DIContainer<RegistryFor<typeof mod.registry>>
}
