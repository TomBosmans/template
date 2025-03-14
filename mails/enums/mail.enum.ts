import NotionMagicLinkEmail from "../emails/notion-magic-link.tsx"
import PlaidVerifyIdentityEmail from "../emails/plaid-verify-identity.tsx"
import StripeWelcomeEmail from "../emails/stripe-welcome.tsx"
import VercelInviteUserEmail from "../emails/vercel-invite-user.tsx"

const Mail = {
  notionMagicLink: NotionMagicLinkEmail,
  plaidVerifyIdentity: PlaidVerifyIdentityEmail,
  stripeWelcome: StripeWelcomeEmail,
  vercelInviteUser: VercelInviteUserEmail,
} as const

type Mail = (typeof Mail)[keyof typeof Mail]
export default Mail
