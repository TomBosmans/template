import { UserDTO } from "#app/users/user.dtos.ts"
import createAppRoute from "#app/utils/createAppRoute.ts"
import type HTTPRoute from "#lib/http/route.ts"
import authGuard from "../auth.guard.ts"

const profileRoute = createAppRoute({
  tags: ["auth"],
  description: "Returns the profile of the signed in user",
  method: "GET",
  path: "/profile",
  statusCode: 200,
  middleware: [authGuard],
  schemas: {
    response: UserDTO,
  },
  async handler({ response, container }) {
    const userRepository = container.resolve("userRepository")
    const session = container.resolve("session")

    const user = await userRepository.findOneOrThrow({
      where: {
        id: session?.userId,
      },
    })

    response.body = user
    return response
  },
}) as HTTPRoute

export default profileRoute
