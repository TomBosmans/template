/** biome-ignore-all lint/suspicious/noExplicitAny: It is ok here> */
import assert from "node:assert"
import { describe, it } from "node:test"
import { CamelCasePlugin, Kysely, PostgresDialect, type PostgresPool, sql } from "kysely"
import whereClause from "../../clauses/where.clause.ts"

const db = new Kysely({
  dialect: new PostgresDialect({
    pool: {} as PostgresPool,
  }),
  plugins: [new CamelCasePlugin()],
})

describe("whereClause", () => {
  it("can build a query", () => {
    const uuid = "f08b6ae7-175d-482b-a1cc-bbccba54c1d8"
    let query = db.selectFrom(sql`users`.as("users")).selectAll()
    query = whereClause({ id: uuid })(query)
    const result = query.compile()
    assert.strictEqual(result.sql, 'select * from users as "users" where "id" = $1')
    assert.deepStrictEqual(result.parameters, [uuid])
  })

  it("handles undefined correctly", () => {
    let query = db.selectFrom(sql`users`.as("users")).selectAll()
    query = whereClause({ id: undefined })(query)
    const result = query.compile()
    assert.deepStrictEqual(result.parameters, [])
    assert.strictEqual(result.sql, 'select * from users as "users"')
  })

  it("can have multiple conditions", () => {
    let query = db.selectFrom(sql`users`.as("users")).selectAll()
    query = whereClause({ age: { $gte: 18, $lte: 65 }, name: { $match: "oh" } } as any)(query)
    const result = query.compile()
    assert.strictEqual(
      result.sql,
      'select * from users as "users" where ("age" >= $1 and "age" <= $2) and "name" ilike $3',
    )
    assert.deepStrictEqual(result.parameters, [18, 65, "%oh%"])
  })

  describe("$and", () => {
    it("can build a query", () => {
      const uuid = "f08b6ae7-175d-482b-a1cc-bbccba54c1d8"
      let query = db.selectFrom(sql`users`.as("users")).selectAll()
      query = whereClause({
        name: "John",
        $and: [{ id: { $eq: uuid } }, { age: { $gt: 18, $lt: 65 } }],
      } as any)(query)
      const result = query.compile()
      assert.strictEqual(
        result.sql,
        'select * from users as "users" where "name" = $1 and ("id" = $2 and ("age" > $3 and "age" < $4))',
      )
      assert.deepStrictEqual(result.parameters, ["John", uuid, 18, 65])
    })
  })

  describe("$or", () => {
    it("can build a query", () => {
      let query = db.selectFrom(sql`users`.as("users")).selectAll()
      query = whereClause({
        name: "John",
        $or: [{ age: { $gt: 18, $lt: 40 } }, { age: { $gt: 21 } }],
      } as any)(query)
      const result = query.compile()
      assert.strictEqual(
        result.sql,
        'select * from users as "users" where "name" = $1 and (("age" > $2 and "age" < $3) or "age" > $4)',
      )
      assert.deepStrictEqual(result.parameters, ["John", 18, 40, 21])
    })
  })

  describe("$nor", () => {
    it("can build a query", () => {
      let query = db.selectFrom(sql`users`.as("users")).selectAll()
      query = whereClause({
        name: "John",
        $nor: [{ age: { $gt: 18, $lt: 40 } }, { age: { $gt: 21 } }],
      } as any)(query)
      const result = query.compile()
      assert.strictEqual(
        result.sql,
        'select * from users as "users" where "name" = $1 and not (("age" > $2 and "age" < $3) or "age" > $4)',
      )
      assert.deepStrictEqual(result.parameters, ["John", 18, 40, 21])
    })
  })

  describe("$eq", () => {
    it("can build a query", () => {
      const uuid = "f08b6ae7-175d-482b-a1cc-bbccba54c1d8"
      let query = db.selectFrom(sql`users`.as("users")).selectAll()
      query = whereClause({ id: { $eq: uuid } } as any)(query)
      const result = query.compile()
      assert.strictEqual(result.sql, 'select * from users as "users" where "id" = $1')
      assert.deepStrictEqual(result.parameters, [uuid])
    })
  })

  describe("$ne", () => {
    it("can build a query", () => {
      const uuid = "f08b6ae7-175d-482b-a1cc-bbccba54c1d8"
      let query = db.selectFrom(sql`users`.as("users")).selectAll()
      query = whereClause({ id: { $ne: uuid } } as any)(query)
      const result = query.compile()
      assert.strictEqual(result.sql, 'select * from users as "users" where "id" != $1')
      assert.deepStrictEqual(result.parameters, [uuid])
    })
  })

  describe("$in", () => {
    it("can build a query", () => {
      const uuid = "f08b6ae7-175d-482b-a1cc-bbccba54c1d8"
      let query = db.selectFrom(sql`users`.as("users")).selectAll()
      query = whereClause({ id: { $in: [uuid] } } as any)(query)
      const result = query.compile()
      assert.strictEqual(result.sql, 'select * from users as "users" where "id" in ($1)')
      assert.deepStrictEqual(result.parameters, [uuid])
    })
  })

  describe("$nin", () => {
    it("can build a query", () => {
      const uuid = "f08b6ae7-175d-482b-a1cc-bbccba54c1d8"
      let query = db.selectFrom(sql`users`.as("users")).selectAll()
      query = whereClause({ id: { $nin: [uuid] } } as any)(query)
      const result = query.compile()
      assert.strictEqual(result.sql, 'select * from users as "users" where "id" not in ($1)')
      assert.deepStrictEqual(result.parameters, [uuid])
    })
  })

  describe("$match", () => {
    it("can build a query", () => {
      let query = db.selectFrom(sql`users`.as("users")).selectAll()
      query = whereClause({ firstName: { $match: "oh" } } as any)(query)
      const result = query.compile()
      assert.strictEqual(result.sql, 'select * from users as "users" where "first_name" ilike $1')
      assert.deepStrictEqual(result.parameters, ["%oh%"])
    })
  })

  describe("$gt", () => {
    it("can build a query", () => {
      let query = db.selectFrom(sql`users`.as("users")).selectAll()
      query = whereClause({ age: { $gt: 21 } } as any)(query)
      const result = query.compile()
      assert.strictEqual(result.sql, 'select * from users as "users" where "age" > $1')
      assert.deepStrictEqual(result.parameters, [21])
    })
  })

  describe("$gte", () => {
    it("can build a query", () => {
      let query = db.selectFrom(sql`users`.as("users")).selectAll()
      query = whereClause({ age: { $gte: 21 } } as any)(query)
      const result = query.compile()
      assert.strictEqual(result.sql, 'select * from users as "users" where "age" >= $1')
      assert.deepStrictEqual(result.parameters, [21])
    })
  })

  describe("$lt", () => {
    it("can build a query", () => {
      let query = db.selectFrom(sql`users`.as("users")).selectAll()
      query = whereClause({ age: { $lt: 65 } } as any)(query)
      const result = query.compile()
      assert.strictEqual(result.sql, 'select * from users as "users" where "age" < $1')
      assert.deepStrictEqual(result.parameters, [65])
    })
  })

  describe("$lte", () => {
    it("can build a query", () => {
      let query = db.selectFrom(sql`users`.as("users")).selectAll()
      query = whereClause({ age: { $lte: 65 } } as any)(query)
      const result = query.compile()
      assert.strictEqual(result.sql, 'select * from users as "users" where "age" <= $1')
      assert.deepStrictEqual(result.parameters, [65])
    })
  })

  describe("nesting $and, $or, $nor", () => {
    it("works", () => {
      const uuid = "f08b6ae7-175d-482b-a1cc-bbccba54c1d8"
      let query = db.selectFrom(sql`users`.as("users")).selectAll()
      query = whereClause({
        name: "John",
        $and: [
          { id: { $eq: uuid } },
          { $or: [{ age: { $gt: 18 } }, { $nor: [{ age: { $lt: 65 } }, { age: { $lt: 45 } }] }] },
        ],
      } as any)(query)
      const result = query.compile()
      assert.strictEqual(
        result.sql,
        'select * from users as "users" where "name" = $1 and ("id" = $2 and ("age" > $3 or not ("age" < $4 or "age" < $5)))',
      )
      assert.deepStrictEqual(result.parameters, ["John", uuid, 18, 65, 45])
    })
  })
})
