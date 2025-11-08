import { OpenApiBuilder } from "openapi3-ts/oas31"
import AppModule from "./app.module.ts"
import type AppRegistry from "./app.registry.ts"

export default function openapiFactory({ config }: AppRegistry) {
  const builder = OpenApiBuilder.create().addOpenApiVersion("3.1.0").addInfo(config.openapi.info)

  for (const route of AppModule.routes) {
    builder.addPath(`${route.path}`.replace(/:(\w+)/g, "{$1}"), route.openapi())
  }

  return builder
}
