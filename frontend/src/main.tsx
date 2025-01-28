import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { Provider as StateProvider } from "jotai"
import { I18nextProvider } from "react-i18next"
import i18n from "../i18n.ts"
import theme from "./theme.ts"

const rootElement = document.getElementById("root")

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <CssBaseline>
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n} defaultNS={"translation"}>
            <StateProvider>
              <App />
            </StateProvider>
          </I18nextProvider>
        </ThemeProvider>
      </CssBaseline>
    </StrictMode>,
  )
}
