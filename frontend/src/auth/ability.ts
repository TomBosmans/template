import {
  AbilityBuilder,
  createMongoAbility,
  type ForcedSubject,
  type MongoAbility,
  type MongoQuery,
} from "@casl/ability"
import type { GetProfileResponse, GetSessionsByIdResponse, GetUsersByIdResponses } from "../client"

export type AppAction = "read" | "create" | "update" | "delete"
export type AppSubjectMap = {
  User: GetUsersByIdResponses["200"]
  Session: GetSessionsByIdResponse
}
export type AppSubjectName = keyof AppSubjectMap

export type AppSubject = AppSubjectName | ForcedSubject<AppSubjectName>

export type AppAbility = MongoAbility<[AppAction, AppSubject], MongoQuery>

export function abilityBuilder(rules?: GetProfileResponse["rules"]) {
  const casl = new AbilityBuilder(createMongoAbility)
  rules?.forEach(({ action, subject, conditions }) => {
    casl.can(action, subject, conditions)
  })
  return casl.build() as AppAbility
}
