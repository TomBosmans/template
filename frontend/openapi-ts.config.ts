import { defineConfig } from "@hey-api/openapi-ts"
import config from "./src/config.ts"

export default defineConfig({
  input: config.openapi.input,
  output: {
    path: "./src/client",
  },
  plugins: ["@hey-api/client-axios", "@tanstack/react-query"],
})
