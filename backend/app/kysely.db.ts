import { CamelCasePlugin, Kysely, PostgresDialect, sql } from "kysely"
import pg from "pg"
import type { DB } from "#db/db.d.ts"
import type { AppRegistry } from "./container.factory.ts"

export default class KyselyDatabase extends Kysely<DB> {
  constructor({ config }: AppRegistry) {
    const dialect = new PostgresDialect({
      pool: new pg.Pool({
        database: config.postgres.database.name,
        host: config.postgres.host,
        user: config.postgres.user,
        port: config.postgres.port,
        max: config.postgres.pool.max,
      }),
    })

    super({ dialect, plugins: [new CamelCasePlugin()] })
  }

  public async truncateAll() {
    const tables = await this
      // biome-ignore lint/suspicious/noExplicitAny: It is ok here
      .selectFrom("pg_tables" as any)
      .select("tablename")
      .where("schemaname", "=", "public")
      .execute()

    for (const { tablename } of tables) {
      await sql`TRUNCATE TABLE "${tablename}" RESTART IDENTITY CASCADE`.execute(this)
    }
  }
}
