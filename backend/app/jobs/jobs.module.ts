import PgBossJobService from "#lib/job/pgbossJob.service.ts"
import Module from "#lib/module/module.ts"
import type Interface from "#lib/types/interface.type.ts"
import type AppJobService from "./job.service.ts"

const JobsModule = new Module({
  registry: { jobService: PgBossJobService as Interface<AppJobService> },
})

export default JobsModule
