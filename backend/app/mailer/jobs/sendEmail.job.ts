import { render } from "@react-email/components"
import type Job from "#lib/job/interface.ts"
import type Mailer from "#lib/mailer/interface.ts"
import type { MailerTemplate } from "../mailer.templates.ts"

export default class SendEmailJob implements Job {
  private readonly mailer: Mailer
  private readonly templates: MailerTemplate

  constructor({ mailer, mailerTemplates }: { mailer: Mailer; mailerTemplates: MailerTemplate }) {
    this.mailer = mailer
    this.templates = mailerTemplates
  }

  public async run<TemplateName extends keyof MailerTemplate>({
    templateName,
    params,
  }: {
    templateName: TemplateName
    params: Parameters<MailerTemplate[TemplateName]>[0]
  }) {
    const { to, from, template, subject, params: mailParams } = this.templates[templateName](params)

    const [html, text] = await Promise.all([
      render(template(mailParams)),
      render(template(mailParams), { plainText: true }),
    ])

    await this.mailer.sendMail({
      from,
      to,
      subject,
      html,
      text,
    })
  }
}
