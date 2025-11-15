/** biome-ignore-all lint/suspicious/noExplicitAny: It is ok here */
import { type ExpressionBuilder, type Selectable, sql } from "kysely"
import type { DB } from "#db/db.js"
import type { SelectQuery } from "../types.ts"
import { mapOperatorExpression } from "../utils.ts"

type BasicWhere<Table extends keyof DB> = Partial<{
  [Key in keyof Selectable<DB[Table]>]:
  | {
    $match?: Selectable<DB[Table]>[Key]
    $eq?: Selectable<DB[Table]>[Key] | null
    $ne?: Selectable<DB[Table]>[Key] | null
    $lt?: Selectable<DB[Table]>[Key] | null
    $lte?: Selectable<DB[Table]>[Key] | null
    $gt?: Selectable<DB[Table]>[Key] | null
    $gte?: Selectable<DB[Table]>[Key] | null
    $in?: Array<Selectable<DB[Table]>[Key]>
    $nin?: Array<Selectable<DB[Table]>[Key]>
  }
  | Selectable<DB[Table]>[Key]
  | null
}>

export type Where<Table extends keyof DB> =
  | { $nor?: Array<BasicWhere<Table>>; $or?: Array<BasicWhere<Table>>; $and?: Array<BasicWhere<Table>> }
  | BasicWhere<Table>

function andWhere<Table extends keyof DB>(whereArray: Array<BasicWhere<Table>>) {
  return (query: SelectQuery<Table>) => {
    return query.where((eb) => {
      return eb.and(
        whereArray.map((where) => {
          const attributes = Object.keys(where) as Array<keyof Where<Table>>
          return eb.and(
            attributes.map((attribute) => {
              return whereCondition(attribute, where)(eb)
            }),
          )
        }),
      )
    })
  }
}

function orWhere<Table extends keyof DB>(whereArray: Array<BasicWhere<Table>>) {
  return (query: SelectQuery<Table>) => {
    return query.where((eb) => {
      return eb.or(
        whereArray.map((where) => {
          const attributes = Object.keys(where) as Array<keyof Where<Table>>
          return eb.and(
            attributes.map((attribute) => {
              return whereCondition(attribute, where)(eb)
            }),
          )
        }),
      )
    })
  }
}

function norWhere<Table extends keyof DB>(whereArray: Array<BasicWhere<Table>>) {
  return (query: SelectQuery<Table>) => {
    return query.where((eb) => {
      return eb.not(eb.or(
        whereArray.map((where) => {
          const attributes = Object.keys(where) as Array<keyof Where<Table>>
          return eb.and(
            attributes.map((attribute) => {
              return whereCondition(attribute, where)(eb)
            }),
          )
        }),
      ))
    })
  }
}

function whereCondition<Table extends keyof DB>(
  attribute: keyof Where<Table>,
  where: Where<Table>,
) {
  return (eb: ExpressionBuilder<DB, any>) => {
    if (typeof where[attribute] !== "object" || where[attribute] === null) {
      const value = where[attribute]
      return eb(attribute as any, mapOperatorExpression("$eq", value as any), value)
    } else {
      const operators = Object.keys(where[attribute] as any) as Array<
        keyof (typeof where)[typeof attribute]
      >

      return eb.and(
        operators.map((operator) => {
          const value = (where[attribute] as any)?.[operator]
          if (value === undefined) return undefined
          if (operator === "$match") {
            return eb(
              attribute as any,
              mapOperatorExpression(operator as any, value),
              sql.val(`%${value}%`),
            )
          }
          return eb(attribute as any, mapOperatorExpression(operator as any, value), value)
        }),
      )
    }
  }
}

export default function whereClause<Table extends keyof DB>(where?: Where<Table>) {
  return (query: SelectQuery<Table>) => {
    if (!where) return query

    const attributes = Object.keys(where) as Array<keyof typeof where>
    for (const attribute of attributes) {
      if (attribute === "$and") {
        query = andWhere(where[attribute] as Array<BasicWhere<Table>>)(query)
      } else if (attribute === "$or") {
        query = orWhere(where[attribute] as Array<BasicWhere<Table>>)(query)
      } else if (attribute === "$nor") {
        query = norWhere(where[attribute] as Array<BasicWhere<Table>>)(query)
      } else {
        query = query.where(whereCondition(attribute, where))
      }
    }

    return query
  }
}
