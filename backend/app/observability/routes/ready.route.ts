import createAppRoute from "#app/utils/createAppRoute.ts"
import type HTTPRoute from "#lib/http/route.ts"
import { ReadyDTO } from "../observability.dtos.ts"

const readyRoute = createAppRoute({
  method: "GET",
  path: "/ready",
  tags: ["observability"],
  schemas: { response: ReadyDTO },
  statusCode: 200,
  async handler({ response, container }) {
    const observabilityService = container.resolve("observabilityService")

    const results = await Promise.all([await observabilityService.postgresReady()])
    const status = results.every((v) => v === true) ? "ready" : "degraded"
    const [postgres] = results

    response.body = {
      status,
      services: { postgres },
    }

    return response
  },
}) as HTTPRoute

export default readyRoute
