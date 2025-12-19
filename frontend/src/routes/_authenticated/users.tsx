import { createFileRoute } from "@tanstack/react-router"
import { Card } from "components"
import { getUsersOptions } from "../../client/@tanstack/react-query.gen"
import UsersTable from "../../users/UsersTable"

export const Route = createFileRoute("/_authenticated/users")({
  beforeLoad: async ({ context }) => {
    await context.queryClient.ensureQueryData(getUsersOptions())
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Card className="m-10">
      <UsersTable />
    </Card>
  )
}
