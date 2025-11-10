import { NewUserDTO, UserDTO } from "#app/users/user.dtos.ts"
import createAppRoute from "#app/utils/createAppRoute.ts"
import type HTTPRoute from "#lib/http/route.ts"

const signUpRoute = createAppRoute({
  method: "POST",
  path: "/sign_up",
  statusCode: 201,
  tags: ["auth"],
  description: `
Creates a new user account with the provided credentials.

 - Accepts first name, last name, email, and password.
 - Automatically signs the user in after registration.
 - Returns the created user's profile and sets a session cookie in the response headers.
`,
  schemas: {
    body: NewUserDTO,
    response: UserDTO,
  },
  async handler({ request, response, container }) {
    const authService = container.resolve("authService")
    const { user, session, token } = await authService.signUp(request.body)
    const sessionCookie = authService.createSessionCookie({ token, expiresAt: session.expiresAt })

    response.body = user
    response.headers = {
      ...response.headers,
      ...sessionCookie,
    }

    return response
  },
}) as HTTPRoute

export default signUpRoute
