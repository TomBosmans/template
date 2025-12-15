import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { createRouter, RouterProvider } from "@tanstack/react-router"
import { Provider as JotaiProvider } from "jotai"
import qs from "qs"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import axios from "./axios.ts"
import { client } from "./client/client.gen.ts"
import NotFoundPage from "./common/pages/notFound.page.tsx"
import I18nProvider from "./i18n/I18nProvider.tsx"
import queryClient, { HydrateAtoms } from "./query.client.ts"
import { routeTree } from "./routeTree.gen.ts"
import store from "./store.ts"

const rootElement = document.getElementById("root")

client.setConfig({
  axios,
  querySerializer: (params) => qs.stringify(params),
})

const router = createRouter({ routeTree, defaultNotFoundComponent: NotFoundPage })

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <JotaiProvider store={store}>
          <HydrateAtoms>
            <I18nProvider>
              <RouterProvider router={router} />
            </I18nProvider>
          </HydrateAtoms>
        </JotaiProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
}
