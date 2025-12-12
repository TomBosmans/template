import * as components from "components"
import z from "zod"
import useI18n from "../i18n/I18n.hook"

export default function SignUpForm() {
  const { t } = useI18n()

  const form = components.useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: z.object({
        firstName: z.string().min(1, { error: () => t("common.errors.required") }),
        lastName: z.string().min(1),
        email: z.email(),
        password: z.string(),
        confirmPassword: z.string(),
      }),
    },
  })

  return (
    <components.Form onFormSubmit={form.handleSubmit}>
      <components.FieldSet legend={t("forms.signUp.legend")} border={true}>
        <form.AppField
          name="firstName"
          children={(field) => <field.TextField label={t("entities.user.firstName")} />}
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
      </components.FieldSet>
    </components.Form>
  )
}
