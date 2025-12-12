/** biome-ignore-all lint/correctness/noChildrenProp: It is ok */
import type { Meta, StoryObj } from "@storybook/react"
import Fieldset from "../input/Fieldset"
import Form from "./Form"
import useAppForm from "./Form.hook"

const meta: Meta<typeof Form> = {
  component: Form,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Form>

export const Example: Story = {
  render: () => {
    const form = useAppForm({
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        age: undefined as number | undefined,
        password: "",
        confirmPassword: "",
      },
      onSubmit: (value) => {
        alert(value)
      },
    })

    return (
      <Form onFormSubmit={form.handleSubmit}>
        <Fieldset legend="Sign Up" border={true}>
          <form.AppField
            name="firstName"
            validators={{
              onChange: ({ value }) => {
                return value.trim() !== "" ? undefined : "First name is required"
              },
            }}
            children={(field) => <field.TextField required label="First name" />}
          />
          <form.AppField
            name="lastName"
            children={(field) => <field.TextField label="Last name" />}
          />
          <form.AppField
            name="email"
            children={(field) => <field.TextField type="email" label="E-mail" />}
          />
          <form.AppField name="age" children={(field) => <field.NumberField label="age" />} />
          <form.AppField
            name="password"
            children={(field) => <field.TextField type="password" label="password" />}
          />
          <form.AppField
            name="confirmPassword"
            children={(field) => <field.TextField type="password" label="Confirm password" />}
          />
          <form.AppForm>
            <form.Submit className="mt-4" label="Submit" />
          </form.AppForm>
        </Fieldset>
      </Form>
    )
  },
}
