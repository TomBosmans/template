import { can } from "#app/app.ability.ts"
import authGuard from "#app/auth/auth.guard.ts"
import createAppRoute from "#app/utils/createAppRoute.ts"
import listDTO from "#app/utils/list.dto.ts"
import listQueryDTO from "#app/utils/listQuery.dto.ts"
import type HTTPRoute from "#lib/http/route.ts"
import { SessionDTO } from "../session.dtos.ts"

const sessionListRoute = createAppRoute({
  method: "GET",
  path: "/sessions",
  statusCode: 200,
  description: "Returns list of all sessions",
  tags: ["sessions"],
  middleware: [authGuard, can("read", "Session")],
  schemas: {
    query: listQueryDTO(SessionDTO),
    response: listDTO(SessionDTO),
  },
  async handler({ request, response, container }) {
    const limit = request.query.limit
    const offset = request.query.offset
    const sessionRepository = container.resolve("sessionRepository")
    const ability = container.resolve("ability")
    const { data, total } = await sessionRepository.findManyWithTotal({
      where: { ...request.query.where, $and: [ability.queryFor("read", "Session")] },
      orderBy: request.query.orderBy,
      limit,
      offset,
    })
    response.body = { data, total, limit, offset }
    return response
  },
}) as HTTPRoute

export default sessionListRoute
