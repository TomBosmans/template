import createAppRoute from "#app/utils/createAppRoute.ts"
import listDTO from "#app/utils/list.dto.ts"
import listQueryDTO from "#app/utils/listQuery.dto.ts"
import type HTTPRoute from "#lib/http/route.ts"
import { UserDTO } from "../user.dtos.ts"

const userListRoute = createAppRoute({
  method: "GET",
  path: "/users",
  statusCode: 200,
  description: "Returns a list of all users.",
  tags: ["users"],
  schemas: {
    query: listQueryDTO(UserDTO),
    response: listDTO(UserDTO),
  },
  async handler({ request, response, container }) {
    const userRepository = container.resolve("userRepository")
    const limit = request.query?.limit
    const offset = request.query?.offset
    const data = await userRepository.findMany(request.query)
    const total = await userRepository.count({ where: request.query?.where })
    response.body = { data, total, limit, offset }
    return response
  },
}) as HTTPRoute

export default userListRoute
