import { render } from "@react-email/render"
import Mail from "../enums/mail.enum.ts"
import type { MailService } from "./interfaces.ts"

export default class ReacEmailMailService implements MailService {
  public async renderHTML<Name extends keyof typeof Mail>(
    name: Name,
    props: Parameters<(typeof Mail)[Name]>[0],
  ) {
    //@ts-ignore - reason: sending undefined when no props is needed works fine
    return await render(Mail[name](props))
  }

  public async renderText<Name extends keyof typeof Mail>(
    name: Name,
    props: Parameters<(typeof Mail)[Name]>[0],
  ) {
    //@ts-ignore - reason: sending undefined when no props is needed works fine
    return await render(Mail[name](props), { plainText: true })
  }
}
