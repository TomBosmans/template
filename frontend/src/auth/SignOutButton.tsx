import { Button } from "components"
import useI18n from "../i18n/I18n.hook"
import { useSignOut } from "./auth.state"

export default function SignOutButton() {
  const { t } = useI18n()
  const { signOut, isPending } = useSignOut()

  return (
    <Button type="button" onClick={signOut} disabled={isPending}>
      {t("forms.signOut.legend")}
    </Button>
  )
}
