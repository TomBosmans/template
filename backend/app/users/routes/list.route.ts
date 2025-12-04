import { can } from "#app/app.ability.ts"
import authGuard from "#app/auth/auth.guard.ts"
import createAppRoute from "#app/utils/createAppRoute.ts"
import listDTO from "#app/utils/list.dto.ts"
import listQueryDTO from "#app/utils/listQuery.dto.ts"
import type HTTPRoute from "#lib/http/route.ts"
import { UserDTO } from "../user.dtos.ts"

const userListRoute = createAppRoute({
  method: "GET",
  path: "/users",
  statusCode: 200,
  description: "Returns a list of all users.",
  tags: ["users"],
  middleware: [authGuard, can("read", "User")],
  schemas: {
    query: listQueryDTO(UserDTO),
    response: listDTO(UserDTO),
  },
  async handler({ request, response, container }) {
    const userRepository = container.resolve("userRepository")
    const ability = container.resolve("ability")
    const limit = request.query?.limit
    const offset = request.query?.offset
    const orderBy = request.query?.orderBy
    const abilityQuery = ability?.queryFor("read", "User") || undefined
    const where = {
      ...request.query.where,
      $and: abilityQuery && [abilityQuery],
    }
    const { data, total } = await userRepository.findManyWithTotal({
      where,
      limit,
      offset,
      orderBy,
    })
    response.body = { data, total, limit, offset }
    return response
  },
}) as HTTPRoute

export default userListRoute
