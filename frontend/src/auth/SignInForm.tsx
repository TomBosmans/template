import { FieldSet, Form, useForm } from "components"
import z from "zod"
import useMapIssuesToFormErrors from "../common/hooks/useMapIssuesToFormErrors"
import useI18n from "../i18n/I18n.hook"
import { useSignIn } from "./auth.state"

export default function SignInForm() {
  const { t } = useI18n()
  const signIn = useSignIn()
  const mapIssuesToFormErrors = useMapIssuesToFormErrors("entities.user")

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value, formApi }) => {
      const result = await signIn(value)
      if (result.success) return
      formApi.setErrorMap({ onSubmit: mapIssuesToFormErrors(result.issues, value) })
    },
    validators: {
      onChange: ({ value }) => {
        const result = z.object({ email: z.email(), password: z.string() }).safeParse(value)
        if (result.success) return
        return mapIssuesToFormErrors(result.error.issues, value)
      },
    },
  })

  return (
    <Form onFormSubmit={form.handleSubmit}>
      <FieldSet legend={t("forms.signIn.legend")} border={true}>
        <form.AppField
          name="email"
          children={(field) => <field.TextField type="email" label={t("entities.user.email")} />}
        />
        <form.AppField
          name="password"
          children={(field) => (
            <field.TextField type="password" label={t("entities.user.password")} />
          )}
        />

        <form.AppForm>
          <form.Submit className="mt-4" label={t("common.actions.submit")} />
        </form.AppForm>
      </FieldSet>
    </Form>
  )
}
