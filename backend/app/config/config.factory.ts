import { z } from "zod"
import type AppRegistry from "#app/app.registry.ts"
import booleanSchema from "#lib/zod/boolean.schema.ts"

export type Config = ReturnType<typeof configFactory>
export default function configFactory({ env }: AppRegistry) {
  return z
    .object({
      SECURE: booleanSchema,

      FRONTEND_SECURE: booleanSchema,
      FRONTEND_DOMAIN: z.string(),
      FRONTEND_PORT: z.coerce.number(),
      OPENAPI_INFO_VERSION: z.string(),
      OPENAPI_INFO_TITLE: z.string(),
      OPENAPI_INFO_DESCRIPTION: z.string(),

      POSTGRES_USER: z.string(),
      POSTGRES_PASSWORD: z.string().optional(),
      POSTGRES_PORT: z.coerce.number(),
      POSTGRES_DATABASE_NAME_DEV: z.string(),
      POSTGRES_DATABASE_NAME_TEST: z.string(),
      POSTGRES_HOST: z.string(),
      POSTGRES_POOL_MAX: z.coerce.number(),

      MAILER_HOST: z.string(),
      MAILER_PORT: z.coerce.number(),
      MAILER_SECURE: booleanSchema,
      MAILER_AUTH_USER: z.string(),
      MAILER_AUTH_PASSWORD: z.string(),

      EMAIL_NOREPLY: z.string().email(),
      EMAIL_SUPPORT: z.string().email(),
    })
    .transform((config) => ({
      secure: config.SECURE,
      frontend: {
        domain: config.FRONTEND_DOMAIN,
        port: config.FRONTEND_PORT,
        secure: config.FRONTEND_SECURE,
        url: `${config.FRONTEND_SECURE ? "https" : "http"}://${config.FRONTEND_DOMAIN}:${config.FRONTEND_PORT}`,
      },
      openapi: {
        info: {
          version: config.OPENAPI_INFO_VERSION,
          title: config.OPENAPI_INFO_TITLE,
          description: config.OPENAPI_INFO_DESCRIPTION,
        },
      },
      postgres: {
        port: config.POSTGRES_PORT,
        user: config.POSTGRES_USER,
        password: config.POSTGRES_PASSWORD,
        host: config.POSTGRES_HOST,
        pool: {
          max: config.POSTGRES_POOL_MAX,
        },
        database: {
          name:
            process.env.NODE_ENV === "test"
              ? config.POSTGRES_DATABASE_NAME_TEST
              : config.POSTGRES_DATABASE_NAME_DEV,
        },
      },

      emails: {
        support: config.EMAIL_SUPPORT,
        noreply: config.EMAIL_NOREPLY,
      },

      mailer: {
        host: config.MAILER_HOST,
        port: config.MAILER_PORT,
        secure: config.MAILER_SECURE,
        auth: {
          user: config.MAILER_AUTH_USER,
          pass: config.MAILER_AUTH_PASSWORD,
        },
      },
    }))
    .parse(env)
}
