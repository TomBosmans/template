import ExpressServer from "./express.server.ts"

const httpServer = new ExpressServer()

await httpServer.start()

process.on("SIGINT", async () => await httpServer.stop())
process.on("SIGTERM", async () => await httpServer.stop())
