import type AppAbility from "./app.ability.ts"
import type AppRegistry from "./app.registry.ts"
import type Profile from "./profiles/profile.entity.ts"

type RequestRegistry = AppRegistry & { profile: Profile; ability: AppAbility }
export default RequestRegistry
