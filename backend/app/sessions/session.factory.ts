import type TestRegistry from "#app/test/test.registry.ts"
import RandomEntityFactory from "#lib/randomEntity.factory.ts"
import { NewSessionDTO } from "./session.dtos.ts"
import type { NewSession, Session } from "./session.entities.ts"

export default class SessionFactory extends RandomEntityFactory<NewSession, Session> {
  private readonly sessionRepository: TestRegistry["sessionRepository"]
  private readonly userFactory: TestRegistry["userFactory"]

  constructor({ sessionRepository, userFactory }: TestRegistry) {
    super()
    this.sessionRepository = sessionRepository
    this.userFactory = userFactory
  }

  protected generate(): NewSession {
    return NewSessionDTO.generateRandom()
  }

  protected async save(newSession: NewSession): Promise<Session> {
    await this.userFactory.create({ id: newSession.userId })
    return await this.sessionRepository.createOne(newSession)
  }
}
