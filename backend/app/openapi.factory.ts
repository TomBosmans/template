import { OpenApiBuilder } from "openapi3-ts/oas31"
import type HTTPRoute from "#lib/http/route.ts"
import type { AppRegistry } from "./container.factory.ts"

const routeRegistry: Array<HTTPRoute> = []

export default function openapiFactory({ config }: AppRegistry) {
  const builder = OpenApiBuilder.create().addOpenApiVersion("3.1.0").addInfo(config.openapi.info)

  for (const route of routeRegistry) {
    builder.addPath(`${route.path}`.replace(/:(\w+)/g, "{$1}"), route.openapi())
  }

  return builder
}
