import { FieldSet, Form, useForm } from "components"
import z from "zod"
import useMapIssuesToFormErrors from "../common/hooks/useMapIssuesToFormErrors"
import useI18n from "../i18n/I18n.hook"
import { useSignUp } from "./auth.state"

export default function SignUpForm() {
  const { t } = useI18n()
  const signUp = useSignUp()
  const mapIssuesToFormErrors = useMapIssuesToFormErrors("entities.user")

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value, formApi }) => {
      const result = await signUp(value)
      if (result.success) return
      formApi.setErrorMap({ onSubmit: mapIssuesToFormErrors(result.issues, value) })
    },
    validators: {
      onChange: ({ value }) => {
        const result = z
          .object({
            firstName: z.string().min(1),
            lastName: z.string().min(1),
            email: z.email(),
            password: z.string(),
            confirmPassword: z.string(),
          })
          .safeParse(value)
        if (result.success) return
        return mapIssuesToFormErrors(result.error.issues, value)
      },
    },
  })

  return (
    <Form onFormSubmit={form.handleSubmit}>
      <FieldSet>
        <form.AppField
          name="firstName"
          children={(field) => (
            <field.TextField label={t("entities.user.firstName", { hello: "world" })} />
          )}
        />
        <form.AppField
          name="lastName"
          children={(field) => <field.TextField label={t("entities.user.lastName")} />}
        />
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
        <form.AppField
          name="confirmPassword"
          children={(field) => (
            <field.TextField type="password" label={t("entities.user.confirmPassword")} />
          )}
        />
        <form.AppForm>
          <form.Submit className="mt-4" label={t("common.actions.submit")} />
        </form.AppForm>
      </FieldSet>
    </Form>
  )
}
