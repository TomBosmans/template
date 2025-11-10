import NodeMailer from "#lib/mailer/node.mailer.ts"
import Module from "#lib/module/module.ts"
import MailerService from "./mailer.service.ts"
import mailerTemplates from "./mailer.templates.ts"

const MailerModule = new Module({
  registry: { mailer: NodeMailer, mailerTemplates: mailerTemplates, mailerService: MailerService },
})

export default MailerModule
