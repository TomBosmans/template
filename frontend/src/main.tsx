import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Provider as JotaiProvider } from "jotai"
import qs from "qs"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import axios from "./axios.ts"
import { client } from "./client/client.gen.ts"
import I18nProvider from "./i18n/I18nProvider.tsx"
import queryClient, { HydrateAtoms } from "./query.client.ts"
import store from "./store.ts"

const rootElement = document.getElementById("root")

client.setConfig({
  axios,
  querySerializer: (params) => qs.stringify(params),
})

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <JotaiProvider store={store}>
          <HydrateAtoms>
            <I18nProvider>
              <App />
            </I18nProvider>
          </HydrateAtoms>
        </JotaiProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
}
