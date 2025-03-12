import { Outlet, createRootRoute } from "@tanstack/react-router"
import Notifications from "../features/Notifications"

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Outlet />
      <Notifications />
    </>
  )
}
