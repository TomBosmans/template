import type AppModule from "#app/app.module.ts"
import type RegistryFor from "#lib/di/registryFor.type.ts"
import type JobService from "#lib/job/service.interface.ts"

type AppJobService = JobService<RegistryFor<(typeof AppModule)["jobs"]>>
export default AppJobService
