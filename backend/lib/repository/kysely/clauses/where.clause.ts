/** biome-ignore-all lint/suspicious/noExplicitAny: It is ok here */
import { type ExpressionBuilder, type ExpressionWrapper, type SqlBool, sql } from "kysely"
import type { DB } from "#db/db.js"
import type { SelectQuery } from "../types.ts"
import { mapOperatorExpression, type Operator } from "../utils.ts"

export type Where<Table extends keyof DB> =
  | {
      $nor?: Array<Where<Table>>
      $or?: Array<Where<Table>>
      $and?: Array<Where<Table>>
    }
  | Partial<{
      [Key in keyof DB[Table]]:
        | {
            $match?: DB[Table][Key]
            $eq?: DB[Table][Key] | null
            $ne?: DB[Table][Key] | null
            $lt?: DB[Table][Key] | null
            $lte?: DB[Table][Key] | null
            $gt?: DB[Table][Key] | null
            $gte?: DB[Table][Key] | null
            $in?: Array<DB[Table][Key]>
            $nin?: Array<DB[Table][Key]>
          }
        | DB[Table][Key]
        | null
    }>

export default function whereClause<Table extends keyof DB>(
  where?: Where<Table>,
): (query: SelectQuery<Table>) => SelectQuery<Table> {
  return (query) => {
    if (!where) return query

    const attributes = Object.keys(where) as Array<keyof typeof where>
    for (const attribute of attributes) {
      const condition = whereCondition(attribute, where)
      if (condition) query = query.where(condition)
    }

    return query
  }
}

function whereCondition<Table extends keyof DB, W extends Where<Table>>(
  attribute: keyof W,
  where: W,
) {
  const value = where[attribute]

  if (
    (attribute === "$and" || attribute === "$or" || attribute === "$nor") &&
    (!Array.isArray(value) || value.length === 0)
  ) {
    return
  }

  if (value === undefined) return

  return (eb: ExpressionBuilder<DB, any>): ExpressionWrapper<DB, any, SqlBool> => {
    if (attribute === "$and" && Array.isArray(value)) {
      return eb.and(
        value.map((w) =>
          eb.and(
            Object.keys(w)
              .map((attr) => whereCondition(attr as keyof W, w)?.(eb))
              .filter(Boolean),
          ),
        ),
      )
    }

    if (attribute === "$or" && Array.isArray(value)) {
      return eb.or(
        value.map((w) =>
          eb.and(
            Object.keys(w)
              .map((attr) => whereCondition(attr as keyof Where<Table>, w)?.(eb))
              .filter(Boolean),
          ),
        ),
      )
    }

    if (attribute === "$nor" && Array.isArray(value)) {
      return eb.not(
        eb.or(
          value.map((w) =>
            eb.and(
              Object.keys(w)
                .map((attr) => whereCondition(attr as keyof Where<Table>, w)?.(eb))
                .filter(Boolean),
            ),
          ),
        ),
      )
    }

    if (typeof value !== "object" || value === null) {
      return eb(attribute as any, mapOperatorExpression("$eq", value as string), value)
    }

    return eb.and(
      Object.keys(value)
        .map((operator) => {
          const opValue = value[operator as keyof typeof value]
          if (opValue === undefined) return null
          if (operator === "$match") {
            return eb(
              attribute as any,
              mapOperatorExpression(operator, opValue as string),
              sql.val(`%${opValue}%`),
            )
          }
          return eb(
            attribute as string,
            mapOperatorExpression(operator as Operator, opValue as string),
            opValue,
          )
        })
        .filter(Boolean),
    )
  }
}
