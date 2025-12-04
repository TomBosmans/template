import authGuard from "#app/auth/auth.guard.ts"
import createAppRoute from "#app/utils/createAppRoute.ts"
import type HTTPRoute from "#lib/http/route.ts"
import ProfileDTO from "../profile.dto.ts"

const profileRoute = createAppRoute({
  tags: ["profiles"],
  description: "Returns the profile of the signed in user",
  method: "GET",
  path: "/profile",
  statusCode: 200,
  middleware: [authGuard],
  schemas: {
    response: ProfileDTO,
  },
  async handler({ response, container }) {
    const profile = container.resolve("profile")
    response.body = profile
    return response
  },
}) as HTTPRoute

export default profileRoute
