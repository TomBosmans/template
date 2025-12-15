import type { Meta, StoryObj } from "@storybook/react-vite"
import Button from "./Button"
import Card from "./Card"
import Form from "./Form/Form"
import Field from "./input/Field"
import Fieldset from "./input/Fieldset"

const meta = {
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return (
      <Card>
        <Form>
          <Fieldset legend="Sign Up">
            <Field required label="First name" />
            <Field required label="Last name" />
            <Field required type="email" label="E-mail" />
            <Field required type="password" label="Password" />
            <Field required type="password" label="Password confirmation" />
            <Button className="mt-4">Submit</Button>
          </Fieldset>
        </Form>
      </Card>
    )
  },
}
