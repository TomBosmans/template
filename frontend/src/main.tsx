import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { Provider as StateProvider } from "jotai"
import { I18nextProvider } from "react-i18next"
import i18n from "../i18n.ts"
import { routeTree } from "./routeTree.gen"
import theme from "./theme.ts"
import CssBaseline from "@mui/material/CssBaseline"
import ThemeProvider from "@mui/material/styles/ThemeProvider"

const router = createRouter({ routeTree })
const rootElement = document.getElementById("root")

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ThemeProvider theme={theme} defaultMode="light" noSsr>
        <CssBaseline enableColorScheme />
        <I18nextProvider i18n={i18n} defaultNS={"translation"}>
          <StateProvider>
            <RouterProvider router={router} />
          </StateProvider>
        </I18nextProvider>
      </ThemeProvider>
    </StrictMode >,
  )
}
