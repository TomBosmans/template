import { can } from "#app/app.ability.ts"
import authGuard from "#app/auth/auth.guard.ts"
import createAppRoute from "#app/utils/createAppRoute.ts"
import DetailParamsDTO from "#app/utils/detailParams.dto.ts"
import type HTTPRoute from "#lib/http/route.ts"
import { UserDTO } from "../user.dtos.ts"

const userDetailRoute = createAppRoute({
  method: "GET",
  path: "/users/:id",
  statusCode: 200,
  description: "Returns the user matching the given id",
  tags: ["users"],
  middleware: [authGuard, can("read", "User")],
  schemas: {
    params: DetailParamsDTO,
    response: UserDTO,
  },
  async handler({ request, response, container }) {
    const id = request.params.id
    const userRepository = container.resolve("userRepository")
    const ability = container.resolve("ability")
    const user = await userRepository.findOneOrThrow({
      where: { id, $and: [ability.queryFor("read", "User")] },
    })
    response.body = user
    return response
  },
}) as HTTPRoute

export default userDetailRoute
