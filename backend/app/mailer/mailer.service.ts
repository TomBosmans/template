import type AppRegistry from "#app/app.registry.ts"
import type { MailerTemplate } from "./mailer.templates.ts"

export default class MailerService {
  private readonly jobService: AppRegistry["jobService"]

  constructor({ jobService }: AppRegistry) {
    this.jobService = jobService
  }

  public async sendEmail<TemplateName extends keyof MailerTemplate>(
    templateName: TemplateName,
    params: Parameters<MailerTemplate[TemplateName]>[0],
  ) {
    return await this.jobService.send("email", {
      templateName,
      params,
    })
  }
}
