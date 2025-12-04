import * as nodemailer from "nodemailer"
import type SMTPTransport from "nodemailer/lib/smtp-transport/index.js"
import type Mailer from "#lib/mailer/interface.ts"

export type NodeMailerOptions = { config: { mailer: SMTPTransport.Options } }
export default class NodeMailer implements Mailer {
  private readonly transporter: nodemailer.Transporter

  constructor({ config }: NodeMailerOptions) {
    this.transporter = nodemailer.createTransport(config.mailer)
  }

  public async sendMail(params: Parameters<Mailer["sendMail"]>[0]) {
    await this.transporter.sendMail(params)
  }
}
