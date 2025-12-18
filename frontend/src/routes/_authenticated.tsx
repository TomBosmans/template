import { createFileRoute, Outlet } from "@tanstack/react-router"
import { Navbar } from "components"
import SignOutButton from "../auth/SignOutButton"
import { getProfileOptions } from "../client/@tanstack/react-query.gen"
import ThemeToggler from "../theme/ThemeToggler"

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context }) => {
    context.queryClient.ensureQueryData(getProfileOptions())
  },
  component: () => (
    <>
      <Navbar start={<div className="flex gap-2"><ThemeToggler /><h1 className="font-bold text-xl">Template</h1></div>} end={<SignOutButton />} />
      <Outlet />
    </>
  ),
})
