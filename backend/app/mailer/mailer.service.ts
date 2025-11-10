import { render } from "@react-email/components"
import type AppRegistry from "#app/app.registry.ts"
import type { MailerTemplate } from "./mailer.templates.ts"

export default class MailerService {
  private readonly mailer: AppRegistry["mailer"]
  private readonly templates: AppRegistry["mailerTemplates"]

  constructor({ mailer, mailerTemplates }: AppRegistry) {
    this.mailer = mailer
    this.templates = mailerTemplates
  }

  public async sendEmail<TemplateName extends keyof MailerTemplate>(
    templateName: TemplateName,
    params: Parameters<MailerTemplate[TemplateName]>[0],
  ) {
    const { to, from, template, subject, params: mailParams } = this.templates[templateName](params)

    const [html, text] = await Promise.all([
      render(template(mailParams)),
      render(template(mailParams), { plainText: true }),
    ])

    return await this.mailer.sendMail({
      from,
      to,
      subject,
      html,
      text,
    })
  }
}
