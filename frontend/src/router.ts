import { createRouter } from "@tanstack/react-router"
import ErrorPage from "./common/pages/error.page"
import NotFoundPage from "./common/pages/notFound.page"
import { routeTree } from "./routeTree.gen"

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFoundPage,
  defaultErrorComponent: ErrorPage,
})
export default router
