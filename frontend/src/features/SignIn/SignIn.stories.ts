import type { Meta, StoryObj } from "@storybook/react"
import Component from "."

const meta: Meta<typeof Component> = {
  component: Component,
}

export default meta

type Story = StoryObj<typeof Component>

export const Minimal: Story = {}
export const WithForgotPassword: Story = {
  args: {
    onSignIn: async () => null,
    onForgotPassword: () => null,
  },
}
export const WithSignUp: Story = {
  args: {
    onSignIn: async () => null,
    onSignUp: () => null,
  },
}
export const Full: Story = {
  args: {
    onSignIn: async () => null,
    onSignUp: () => null,
    onForgotPassword: () => null,
  },
}
