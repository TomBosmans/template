import { createFileRoute, Outlet } from "@tanstack/react-router"
import { getProfileOptions } from "../client/@tanstack/react-query.gen"
import DashboardLayout from "../common/layouts/dashboard.layout"

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    await context.queryClient.ensureQueryData(getProfileOptions())
  },
  component: () => (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ),
})
