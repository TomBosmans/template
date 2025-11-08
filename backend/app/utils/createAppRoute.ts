/** biome-ignore-all lint/suspicious/noExplicitAny: Is needed here to allow infer to work */
import type AppRegistry from "#app/app.registry.ts"
import type DTO from "#lib/dto/interface.ts"
import HTTPRoute from "#lib/http/route.ts"

export default function createAppRoute<
  Query extends DTO<any, any, any> = DTO<any, any, any>,
  Params extends DTO<any, any, any> = DTO<any, any, any>,
  Body extends DTO<any, any, any> = DTO<any, any, any>,
  Response extends DTO<any, any, any> = DTO<any, any, any>,
>(params: ConstructorParameters<typeof HTTPRoute<AppRegistry, Query, Params, Body, Response>>[0]) {
  return new HTTPRoute<AppRegistry, Query, Params, Body, Response>(params)
}
