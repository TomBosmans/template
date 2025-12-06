import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import I18nProvider from "./i18n/I18nProvider.tsx"

// biome-ignore lint/style/noNonNullAssertion: It is ok here
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>,
)
