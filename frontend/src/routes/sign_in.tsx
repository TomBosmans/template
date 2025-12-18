import { createFileRoute, useNavigate } from "@tanstack/react-router"
import AuthLayout from "../auth/AuthLayout"
import SignInForm from "../auth/SignInForm"
import useI18n from "../i18n/I18n.hook"

export const Route = createFileRoute("/sign_in")({
  component: RouteComponent,
  validateSearch: (search: { from?: string }) => search,
})

function RouteComponent() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const search = Route.useSearch()
  const handleSuccess = () => navigate({ to: search.from || "/dashboard" })

  return (
    <AuthLayout title={t("forms.signIn.legend")}>
      <SignInForm onSuccess={handleSuccess} />
    </AuthLayout>
  )
}
