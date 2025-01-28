import type { Meta, StoryObj } from "@storybook/react"
import Component from "."

const meta: Meta<typeof Component> = {
  component: Component,
}

export default meta

type Story = StoryObj<typeof Component>

export const Full: Story = {
  args: {
    onSignIn: () => null,
    onSignUp: () => null,
  },
}
