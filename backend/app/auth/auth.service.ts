import type AppRegistry from "#app/app.registry.ts"
import Issue from "#lib/exceptions/issue.ts"
import UnauthenticatedException from "#lib/exceptions/unauthenticated.exception.ts"
import ValidationException from "#lib/exceptions/validation.exception.ts"

export default class AuthService {
  private readonly userRepository: AppRegistry["userRepository"]
  private readonly sessionRepository: AppRegistry["sessionRepository"]
  private readonly hasher: AppRegistry["hasher"]
  private readonly tokenService: AppRegistry["tokenService"]
  private readonly config: AppRegistry["config"]
  private readonly mailerService: AppRegistry["mailerService"]

  constructor({
    config,
    userRepository,
    sessionRepository,
    hasher,
    tokenService,
    mailerService,
  }: AppRegistry) {
    this.config = config
    this.userRepository = userRepository
    this.sessionRepository = sessionRepository
    this.hasher = hasher
    this.tokenService = tokenService
    this.mailerService = mailerService
  }

  public async signUp(params: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) {
    const user = await this.userRepository.createOne({
      ...params,
      password: await this.hasher.hash(params.password),
    })

    const token = this.tokenService.generateToken()

    const session = await this.sessionRepository.createOne({
      hashedToken: this.tokenService.hashToken(token),
      userId: user.id,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    })

    await this.mailerService.sendEmail("welcome", user)

    return { user, session, token }
  }

  public async signIn(params: { email: string; password: string }) {
    const obscureIssue = new Issue({
      code: "custom",
      path: [],
      message: "Invalid email or password",
    })
    const user = await this.userRepository.findOne({ where: { email: params.email } })
    if (!user) throw new ValidationException([obscureIssue])

    const isValid = await this.hasher.verify(user.password, params.password)
    if (!isValid) throw new ValidationException([obscureIssue])

    const token = this.tokenService.generateToken()
    const session = await this.sessionRepository.createOne({
      hashedToken: this.tokenService.hashToken(token),
      userId: user.id,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    })

    return { user, session, token }
  }

  public async signOut(token: string) {
    await this.sessionRepository.delete({
      where: { hashedToken: this.tokenService.hashToken(token) },
    })
  }

  public async authenticate(token: string) {
    const hashedToken = this.tokenService.hashToken(token)
    const session = await this.sessionRepository.findOne({ where: { hashedToken } })
    if (session === null) throw new UnauthenticatedException()

    if (Date.now() >= session.expiresAt.getTime()) {
      await this.sessionRepository.delete({ where: { id: hashedToken } })
      throw new UnauthenticatedException()
    }
    if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
      const [updatedSession] = await this.sessionRepository.update({
        where: { id: hashedToken },
        set: { expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) },
      })

      return updatedSession
    }

    return session
  }

  public createSessionCookie({ token, expiresAt }: { token: string; expiresAt: Date }) {
    if (this.config.secure) {
      return {
        "Set-Cookie": `session=${token}; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; Path=/; Secure;`,
      }
    }

    return {
      "Set-Cookie": `session=${token}; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; Path=/`,
    }
  }

  public deleteSessionCookie() {
    if (this.config.secure) {
      return { "Set-Cookie": "session=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/; Secure;" }
    }

    return { "Set-Cookie": "session=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/" }
  }
}
