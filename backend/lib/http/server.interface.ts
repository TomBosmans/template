export default interface HTTPServer {
  start(): Promise<void>
  stop(): Promise<void>
}
