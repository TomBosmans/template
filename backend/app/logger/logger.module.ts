import WinstonLogger from "#lib/logger/winstond.logger.ts"
import Module from "#lib/module/module.ts"

const LoggerModule = new Module({
  registry: { logger: WinstonLogger, trace: {} as { id?: string; source?: string } },
})

export default LoggerModule
