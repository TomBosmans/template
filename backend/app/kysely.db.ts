import { CamelCasePlugin, Kysely, PostgresDialect, sql } from "kysely"
import pg from "pg"
import type { DB } from "#db/db.d.ts"
import type { AppRegistry } from "./container.factory.ts"

export default class KyselyDatabase extends Kysely<DB> {
  static dialect: PostgresDialect

  constructor({ config, logger }: AppRegistry) {
    // INFO: This makes sure we do not create new connection each time
    KyselyDatabase.dialect ||= new PostgresDialect({
      pool: new pg.Pool({
        database: config.postgres.database.name,
        host: config.postgres.host,
        user: config.postgres.user,
        port: config.postgres.port,
        max: config.postgres.pool.max,
      }),
    })

    super({
      dialect: KyselyDatabase.dialect,
      plugins: [new CamelCasePlugin()],
      log(event) {
        if (event.level === "error") {
          logger.error("Query failed : ", {
            durationMs: event.queryDurationMillis,
            error: event.error,
            sql: event.query.sql,
            params: event.query.parameters,
          })
        } else {
          logger.info("Query executed : ", {
            durationMs: event.queryDurationMillis,
            sql: event.query.sql,
            params: event.query.parameters,
          })
        }
      },
    })
  }

  /**
   * Truncates (empties) all user-defined tables in the current PostgreSQL database schema.
   *
   * This method:
   * 1. Queries the PostgreSQL system catalog `pg_tables` to retrieve all table names
   *    within the `public` schema, excluding the `schema_migrations` table (which typically
   *    tracks database migrations and should not be cleared).
   * 2. Iterates through each table and executes a `TRUNCATE TABLE` statement with:
   *    - `RESTART IDENTITY`: resets all auto-incrementing primary key sequences.
   *    - `CASCADE`: automatically truncates dependent tables with foreign keys.
   *
   * This is particularly useful for resetting the database state in test environments
   * or before running integration tests, without dropping and recreating tables.
   *
   * Equivalent SQL executed for each table:
   * ```sql
   * TRUNCATE TABLE <table_name> RESTART IDENTITY CASCADE;
   * ```
   *
   * @example
   * // Clear all tables before a test suite
   * await db.truncateAll()
   */
  public async truncateAll() {
    const tables = await this.selectFrom(sql`pg_tables`.as("pg_tables"))
      .select(sql<string>`tablename`.as("tablename"))
      .where(sql`schemaname`, "=", "public")
      .where(sql`tablename`, "!=", "schema_migrations")
      .execute()

    for (const { tablename } of tables) {
      await sql`TRUNCATE TABLE ${sql.id(tablename)} RESTART IDENTITY CASCADE`.execute(this)
    }
  }

  /**
   * Retrieves a summary of all current PostgreSQL connections to the database.
   *
   * This method queries the `pg_stat_activity` system view, which contains a row
   * for every active connection (session) to the PostgreSQL server. It aggregates
   * the connections by:
   * - `datname` (database name)
   * - `usename` (PostgreSQL user)
   * - `client_addr` (client IP address)
   * - `state` (connection state: e.g. "active", "idle")
   *
   * The result shows how many connections exist per combination of these fields.
   * This can be used to monitor connection pool usage or detect connection leaks.
   *
   * Equivalent SQL:
   * ```sql
   * SELECT
   *   datname AS database,
   *   usename AS user,
   *   client_addr AS "clientAddress",
   *   state,
   *   COUNT(*) AS connections
   * FROM pg_stat_activity
   * WHERE datname = current_database()
   * GROUP BY datname, usename, client_addr, state
   * ORDER BY connections DESC;
   * ```
   */
  public async connections() {
    return await this.selectFrom(sql`pg_stat_activity`.as("pg_stat_activity"))
      .select(sql<string>`datname`.as("database"))
      .select(sql<string>`usename`.as("user"))
      .select(sql<string>`client_addr`.as("clientAddress"))
      .select(sql<string>`state`.as("state"))
      .select(sql<number>`COUNT(*)`.as("connections"))
      .where(sql`datname`, "=", sql`current_database()`)
      .groupBy([sql`datname`, sql`usename`, sql`client_addr`, sql`state`])
      .orderBy(sql`connections DESC`)
      .execute()
  }
}
