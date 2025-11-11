import WinstonLogger from "#lib/logger/winstond.logger.ts"
import Module from "#lib/module/module.ts"
import ObservabilitySerice from "./observability.service.ts"
import healthRoute from "./routes/health.route.ts"
import readyRoute from "./routes/ready.route.ts"

const ObservabilityModule = new Module({
  registry: {
    logger: WinstonLogger,
    trace: {} as { id?: string; source?: string },
    observabilityService: ObservabilitySerice,
  },
  routes: [healthRoute, readyRoute],
})

export default ObservabilityModule
