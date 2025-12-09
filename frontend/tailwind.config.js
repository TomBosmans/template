import { join } from "node:path"

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    join(process.cwd(), "node_modules/components/src/**/*.{js,ts,jsx,tsx}"),
  ],
  theme: {},
  plugins: [],
}
