import { createRouter } from "@tanstack/react-router"
import ErrorPage from "./common/pages/error.page"
import NotFoundPage from "./common/pages/notFound.page"
import queryClient from "./query.client"
import { routeTree } from "./routeTree.gen"

const router = createRouter({
  routeTree,
  context: {
    queryClient
  },
  defaultNotFoundComponent: NotFoundPage,
  defaultErrorComponent: ErrorPage,
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

export default router
