import { z } from "zod"
import packageJSON from "../package.json" with { type: "json" }

export type Config = ReturnType<typeof configFactory>
export default function configFactory({ env }: { env: Record<string, unknown> }) {
  return z
    .object({
      BACKEND_PORT: z.coerce.number(),

      POSTGRES_USER: z.string(),
      POSTGRES_PASSWORD: z.string(),
      POSTGRES_PORT: z.coerce.number(),
      POSTGRES_DATABASE: z.string(),

      OPENAPI_INFO_VERSION: z.string().default(packageJSON.version),
      OPENAPI_INFO_TITLE: z.string().default(packageJSON.name),
      OPENAPI_INFO_DESCRIPTION: z.string().default(packageJSON.description),
    })
    .transform((config) => ({
      backend: {
        port: config.BACKEND_PORT,
      },
      postgres: {
        port: config.POSTGRES_PORT,
        user: config.POSTGRES_USER,
        password: config.POSTGRES_PASSWORD,
        database: config.POSTGRES_DATABASE,
      },
      openapi: {
        info: {
          version: config.OPENAPI_INFO_VERSION,
          title: config.OPENAPI_INFO_TITLE,
          description: config.OPENAPI_INFO_DESCRIPTION,
        },
      },
    }))
    .parse(env)
}
