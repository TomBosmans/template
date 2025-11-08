import createAppRoute from "#app/utils/createAppRoute.ts"
import DetailParamsDTO from "#app/utils/detailParams.dto.ts"
import type HTTPRoute from "#lib/http/route.ts"
import { SessionDTO } from "../session.dtos.ts"

const sessionDetailRoute = createAppRoute({
  method: "GET",
  path: "/sessions/:id",
  statusCode: 200,
  description: "Returns sessions for given id",
  tags: ["sessions"],
  schemas: {
    params: DetailParamsDTO,
    response: SessionDTO,
  },
  async handler({ request, response, container }) {
    const id = request.params.id
    const sessionRepository = container.resolve("sessionRepository")
    const session = await sessionRepository.findOneOrThrow({ where: { id } })
    response.body = session
    return response
  },
}) as HTTPRoute

export default sessionDetailRoute
