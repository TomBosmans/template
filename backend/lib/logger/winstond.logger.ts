import winston from "winston"
import type Logger from "./interface.ts"

const logFormat = winston.format.printf((info) => {
  const date = new Date().toISOString()
  const { message, level, ...rest } = info
  const restStr = Object.keys(rest).length ? ` ${JSON.stringify(rest, null, 4)}` : ""
  return `${date} ${level}: ${message}${restStr}`
})

export default class WinstonLogger implements Logger {
  private readonly winston: winston.Logger
  private readonly traceId: string | undefined
  private readonly traceSource: string | undefined

  constructor({ trace }: { trace?: { id: string; source: string } }) {
    this.traceId = trace?.id
    this.traceSource = trace?.source
    this.winston = winston.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(winston.format.colorize(), logFormat),
        }),
      ],
    })
  }

  public info(message: string, obj?: object) {
    this.winston.info(message, { traceId: this.traceId, traceSource: this.traceSource, ...obj })
  }

  public warn(message: string, obj?: object) {
    this.winston.warn(message, { traceId: this.traceId, traceSource: this.traceSource, ...obj })
  }

  public error(message: string, obj?: object) {
    this.winston.error(message, { traceId: this.traceId, ...obj })
  }

  public fatal(message: string, obj?: object) {
    this.winston.crit(message, { traceId: this.traceId, ...obj })
  }
}
