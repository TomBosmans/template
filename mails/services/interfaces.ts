import type Mail from "../enums/mail.enum"

export interface MailService {
  renderHTML<Name extends keyof typeof Mail>(
    name: Name,
    props: Parameters<(typeof Mail)[Name]>[0],
  ): Promise<string>

  renderText<Name extends keyof typeof Mail>(
    name: Name,
    props: Parameters<(typeof Mail)[Name]>[0] | never,
  ): Promise<string>
}
