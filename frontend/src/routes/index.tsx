import { createFileRoute } from "@tanstack/react-router"
import { useProfile } from "../auth/auth.state"
import SignOutButton from "../auth/SignOutButton"

export const Route = createFileRoute("/")({
  component: RouteComponent,
})

function RouteComponent() {
  const profile = useProfile()
  return (
    <>
      {JSON.stringify(profile)}
      <SignOutButton />
    </>
  )
}
