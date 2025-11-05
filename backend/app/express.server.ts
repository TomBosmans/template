import type { Server } from "node:http"
import cookieParser from "cookie-parser"
import cors from "cors"
import express, { type Express } from "express"
import qs from "qs"
import swaggerUi from "swagger-ui-express"
import HttpContentType from "#lib/http/contentType.enum.ts"
import HttpMethodMapping from "#lib/http/methodMapping.util.ts"
import type HTTPRoute from "#lib/http/route.ts"
import type HTTPServer from "#lib/http/server.interface.ts"
import HttpStatusCode from "#lib/http/statusCode.enum.ts"
import type { AppContainer } from "./container.factory.ts"
import containerFactory from "./container.factory.ts"
import exceptionHandlerFactory from "./exceptionHandler.factory.ts"
import openapiFactory from "./openapi.factory.ts"

export default class ExpressServer implements HTTPServer {
  private readonly express: Express
  private readonly container: AppContainer
  private server: Server | undefined = undefined

  constructor() {
    this.container = containerFactory()
    this.express = express()
      .use(express.json())
      .use(cookieParser())
      .set("query parser", (str: string) => qs.parse(str))
      .use(
        cors({
          origin: this.container.resolve("config").frontend.url,
          credentials: true,
        }),
      )
  }

  public async start() {
    this.registerRoutes([])
    this.setupSwagger()
    this.setupErrorHandling()
    this.listen()
  }

  public async stop() {
    const logger = this.container.resolve("logger")
    await this.container.resolve("db").destroy()
    logger.info("close db connections")
    await this.container.dispose()
    logger.info("disposed DI container")
    this.server?.close(() => logger.info("stopped http server"))
  }

  private registerRoutes(routes: HTTPRoute[]) {
    for (const route of routes) {
      // example: app.get("/", async () => ...)
      this.express[HttpMethodMapping[route.method]](route.path, async (request, response, next) => {
        try {
          const { statusCode, body, contentType, headers } = await route.handle({
            response: { statusCode: route.statusCode, contentType: "application/json" },
            request: {
              path: request.path,
              method: route.method,
              body: request.body,
              query: request.query,
              params: request.params,
              getCookie: (name: string) => request.cookies[name] || null,
              getHeader: (name: string) => request.header(name) || null,
            },
            container: this.container,
          })

          if (headers) {
            for (const [key, value] of Object.entries(headers)) {
              if (value !== undefined) {
                response.setHeader(key, value)
              }
            }
          }

          response.contentType(contentType).status(statusCode).send(body)
        } catch (error) {
          next(error)
        }
      })
    }
  }

  private setupSwagger() {
    const openapi = this.container.build(openapiFactory)
    this.express.get("/openapi", (_req, response) => {
      response
        .contentType(HttpContentType.JSON)
        .status(HttpStatusCode.OK)
        .send(openapi.getSpecAsJson())
    })
    this.express.use("/swagger", swaggerUi.serve, swaggerUi.setup(openapi.getSpec()))
  }

  private setupErrorHandling() {
    const exceptionHandler = this.container.build(exceptionHandlerFactory)
    this.express.use(
      (
        err: Error,
        _request: express.Request,
        response: express.Response,
        _next: express.NextFunction,
      ) => {
        const { statusCode, body, headers: header } = exceptionHandler(err)
        response.contentType(HttpContentType.JSON).status(statusCode).header(header).send(body)
      },
    )
  }

  private listen() {
    const logger = this.container.resolve("logger")
    this.server = this.express.listen(3000, () => {
      logger.info(`Express is listening on port 3000`)
    })
  }
}
