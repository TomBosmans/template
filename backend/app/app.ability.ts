import type { RuleAction } from "#app/roles/role.entities.ts"
import type { Session } from "#app/sessions/session.entities.ts"
import type { User } from "#app/users/user.entities.ts"
import Ability from "#lib/ability/casl.ability.ts"
import UnauthorizedException from "#lib/exceptions/unauthorized.exception.ts"
import type Middleware from "#lib/http/middleware.type.ts"
import type Profile from "./profiles/profile.entity.ts"
import type RequestRegistry from "./request.registry.ts"

export type Action = "read" | "create" | "update" | "delete"
export type Subject = {
  User: User
  Session: Session
}

export function can(action: Action, subject: keyof Subject) {
  const canGuard: Middleware<RequestRegistry> = async ({ response, container }) => {
    const ability = container.resolve("ability")
    if (!ability) throw new Error("User should be authenticated first, use the authGuard")
    if (ability.can(action, subject)) return response
    throw new UnauthorizedException(`No access to ${action} on ${subject}`)
  }
  return canGuard
}

export default class AppAbility extends Ability<Action, RuleAction, Subject, Profile> {
  public get resolveAction() {
    return { crud: ["create", "read", "update", "delete"] satisfies Action[] }
  }
}
