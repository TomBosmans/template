import type { Meta, StoryObj } from "@storybook/react"
import Component from "."
import { RoutePath } from "../../utils/routes"

const meta: Meta<typeof Component> = {
  component: Component,
}

export default meta

type Story = StoryObj<typeof Component>

export const General: Story = {
  args: {
    onSubmit: () => ({ success: true }),
    links: { forgotPassword: "#forgot_password" as RoutePath, signUp: "#signUP" as RoutePath }
  }
}
