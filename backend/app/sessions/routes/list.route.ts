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
  schemas: {
    query: listQueryDTO(SessionDTO),
    response: listDTO(SessionDTO),
  },
  async handler({ request, response, container }) {
    const limit = request.query.limit
    const offset = request.query.offset
    const where = request.query.where
    const orderBy = request.query.orderBy
    const sessionRepository = container.resolve("sessionRepository")
    const data = await sessionRepository.findMany({ where, orderBy, limit, offset })
    const total = await sessionRepository.count({ where })
    response.body = { data, total }
    return response
  },
}) as HTTPRoute

export default sessionListRoute
