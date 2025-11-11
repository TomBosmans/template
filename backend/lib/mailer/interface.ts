export default interface Mailer {
  sendMail(params: {
    from: string
    to: string
    subject: string
    text?: string
    html?: string
  }): Promise<void>
}
