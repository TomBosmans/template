import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import Notifications from "../notifications/Notifications"

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Notifications />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}
