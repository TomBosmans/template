import { sql } from "kysely"
import type AppRegistry from "#app/app.registry.ts"

export default class ObservabilitySerice {
  private readonly db: AppRegistry["db"]

  constructor({ db }: AppRegistry) {
    this.db = db
  }

  public async httpServerStatus() {
    try {
      const [{ count: sessions }] = await this.db
        .selectFrom("sessions")
        .select(sql<number>`count(*)::int`.as("count"))
        .where("sessions.expiresAt", ">", sql<Date>`NOW()`)
        .execute()

      return { ok: true, sessions }
    } catch {}

    return { ok: true }
  }

  public async postgresReady() {
    try {
      const {
        rows: [{ ready }],
      } = await sql<{ ready: true }>`select true as ready`.execute(this.db)
      return ready
    } catch {
      return false
    }
  }

  public async postgresStatus(): Promise<{ ok: true; connections: number } | { ok: false }> {
    try {
      const connections = await this.db.connections()
      return { ok: true, connections: connections.length }
    } catch {
      return { ok: false }
    }
  }
}
