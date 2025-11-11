import { PgBoss } from "pg-boss"
import type Logger from "#lib/logger/interface.ts"
import type Job from "./interface.ts"
import type JobService from "./service.interface.ts"

type Config = {
  postgres: {
    host: string
    database: { name: string }
    user: string
    password: string
  }
}

export default class PgBossJobService<Registry extends Record<string, Job>>
  implements JobService<Registry>
{
  private static boss: PgBoss

  constructor({ config, logger }: { config: Config; logger: Logger }) {
    if (PgBossJobService.boss) return

    PgBossJobService.boss = new PgBoss({
      host: config.postgres.host,
      database: config.postgres.database.name,
      user: config.postgres.user,
      password: config.postgres.password,
      migrate: true,
      schema: "pgboss",
    })
    PgBossJobService.boss.on("error", (e) => logger.error("JOB ERROR", e))
  }

  public async start() {
    await PgBossJobService.boss.start()
  }

  public async stop() {
    await PgBossJobService.boss.stop()
  }

  public async send(queue: keyof Registry, params: Parameters<Registry[keyof Registry]["run"]>[0]) {
    const id = await PgBossJobService.boss.send(queue as string, params as object)
    if (!id) throw new Error("job send returned no id")
    return id
  }

  public async register(
    name: keyof Registry,
    handler: Registry[keyof Registry],
    options: { concurrency?: number } = { concurrency: 1 },
  ) {
    await PgBossJobService.boss.createQueue(name as string)
    await PgBossJobService.boss.work(
      name as string,
      { batchSize: options?.concurrency },
      async (jobs) => {
        await Promise.all(jobs.map((job) => handler.run(job.data)))
      },
    )
  }
}
