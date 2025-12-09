import type { Meta, StoryObj } from "@storybook/react-vite"
import Field from "./Field"
import Fieldset from "./Fieldset"

const meta = {
  component: Fieldset,
  tags: ["autodocs"],
  args: {
    legend: "Sign up",
    className: "",
    border: true,
    children: (
      <>
        <Field label="Email" type="email" placeholder="john.doe@email.com" />
        <Field label="First name" placeholder="John" />
        <Field label="Last name" placeholder="Doe" />
        <Field label="password" type="password" placeholder="password" />
        <Field label="password confirmation" type="password confirmation" placeholder="password" />
      </>
    ),
  },
} satisfies Meta<typeof Fieldset>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
