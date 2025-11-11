import authGuard from "#app/auth/auth.guard.ts"
import createAppRoute from "#app/utils/createAppRoute.ts"
import type HTTPRoute from "#lib/http/route.ts"
import { HealthDTO } from "../observability.dtos.ts"

const healthRoute = createAppRoute({
  method: "GET",
  path: "/health",
  statusCode: 200,
  tags: ["observability"],
  middleware: [authGuard],
  schemas: {
    response: HealthDTO,
  },
  async handler({ response, container }) {
    const observabilityService = container.resolve("observabilityService")

    const [httpServer, postgres] = await Promise.all([
      observabilityService.httpServerStatus(),
      observabilityService.postgresStatus(),
    ])

    response.body = {
      httpServer,
      postgres,
    }
    return response
  },
}) as HTTPRoute

export default healthRoute
