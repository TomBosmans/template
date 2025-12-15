import { createFileRoute } from "@tanstack/react-router"
import AuthLayout from "../auth/AuthLayout"
import SignUpForm from "../auth/SignUpForm"
import useI18n from "../i18n/I18n.hook"

export const Route = createFileRoute("/sign_up")({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useI18n()

  return (
    <AuthLayout title={t("forms.signUp.legend")}>
      <SignUpForm />
    </AuthLayout>
  )
}
