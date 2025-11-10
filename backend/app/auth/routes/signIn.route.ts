import { UserDTO } from "#app/users/user.dtos.ts"
import createAppRoute from "#app/utils/createAppRoute.ts"
import type HTTPRoute from "#lib/http/route.ts"
import { SignInDTO } from "../auth.dtos.ts"

const signInRoute = createAppRoute({
  tags: ["auth"],
  description: `
  Signs out the currently authenticated user by invalidating the session token.
  `,
  method: "POST",
  path: "/sign_in",
  statusCode: 201,
  schemas: {
    body: SignInDTO,
    response: UserDTO,
  },
  async handler({ request, response, container }) {
    const authService = container.resolve("authService")
    const { user, session, token } = await authService.signIn(request.body)
    const sessionCookie = authService.createSessionCookie({ token, expiresAt: session.expiresAt })

    response.body = user
    response.headers = {
      ...response.headers,
      ...sessionCookie,
    }

    return response
  },
}) as HTTPRoute

export default signInRoute
