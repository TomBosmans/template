import { WelcomeEmail } from "emails"
import type { Config } from "#app/config/config.factory.ts"
import type { User } from "#app/users/user.entities.ts"

export type MailerTemplate = ReturnType<typeof mailerTemplates>
export default function mailerTemplates({ config }: { config: Config }) {
  return {
    welcome: (user: User) => ({
      subject: `Welcome ${user.firstName} ${user.lastName}!`,
      to: user.email,
      from: config.emails.noreply,
      template: WelcomeEmail,
      params: {
        name: `${user.firstName} ${user.lastName}`,
        supportEmail: config.emails.support,
      } as Parameters<typeof WelcomeEmail>[0],
    }),
  } as const
}
