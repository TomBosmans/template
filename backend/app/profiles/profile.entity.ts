import type ProfileRepository from "./profile.repository.ts"

type Profile = Exclude<Awaited<ReturnType<ProfileRepository["findOneOrThrow"]>>, null>
export default Profile
