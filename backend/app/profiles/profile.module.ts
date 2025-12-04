import Module from "#lib/module/module.ts"
import ProfileRepository from "./profile.repository.ts"
import profileRoute from "./routes/profile.route.ts"

const ProfileModule = new Module({
  registry: { profileRepository: ProfileRepository },
  routes: [profileRoute],
})

export default ProfileModule
