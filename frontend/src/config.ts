import z from "zod"

const config = z
  .object({
    VITE_APP_TOLGEE_LANGUAGES_DEFAULT: z.string(),
    VITE_APP_TOLGEE_LANGUAGES_AVAILABLE: z.string().transform((v) => v.split(",")),
    VITE_APP_TOLGEE_API_URL: z.url().optional(),
    VITE_APP_TOLGEE_API_KEY: z.string().optional(),
  })
  .transform((config) => ({
    tolgee: {
      api: { key: config.VITE_APP_TOLGEE_API_KEY, url: config.VITE_APP_TOLGEE_API_URL },
      languages: {
        default: config.VITE_APP_TOLGEE_LANGUAGES_DEFAULT,
        available: config.VITE_APP_TOLGEE_LANGUAGES_AVAILABLE,
      },
    },
  }))
  .parse(import.meta.env)

export default config
