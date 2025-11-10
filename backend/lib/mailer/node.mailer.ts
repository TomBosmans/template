import * as nodemailer from "nodemailer"
import type SMTPPool from "nodemailer/lib/smtp-pool/index.js"
import type Mailer from "#lib/mailer/interface.ts"

export default class NodeMailer implements Mailer {
  private readonly transporter: nodemailer.Transporter

  constructor({ config }: { config: { mailer: SMTPPool.Options } }) {
    this.transporter = nodemailer.createTransport(config.mailer)
  }

  public async sendMail(params: Parameters<Mailer["sendMail"]>[0]) {
    await this.transporter.sendMail(params)
  }
}
