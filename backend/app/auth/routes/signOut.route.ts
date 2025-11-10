import createAppRoute from "#app/utils/createAppRoute.ts"
import type HTTPRoute from "#lib/http/route.ts"

const signOutRoute = createAppRoute({
  method: "DELETE",
  path: "/sign_out",
  statusCode: 204,
  tags: ["auth"],
  description: `
  Signs out the currently authenticated user by invalidating the session token and deleting the session.
  `,
  async handler({ request, response, container }) {
    const authService = container.resolve("authService")
    const token = request.getCookie("session")
    if (token) await authService.signOut(token)
    const sessionCookie = authService.deleteSessionCookie()
    response.headers = {
      ...response.headers,
      ...sessionCookie,
    }

    return response
  },
}) as HTTPRoute

export default signOutRoute
