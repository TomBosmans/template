import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"
import Toggler from "../components/Toggler"

const meta: Meta<typeof Toggler> = {
  title: "Components/Toggler",
  component: Toggler,
  tags: ["autodocs"],
  argTypes: {},
  args: { onToggle: fn() },
}

export default meta

type Story = StoryObj<typeof Toggler>

export const Default: Story = {
  args: {
    on: "ON",
    off: "OFF",
  },
}

export const ON: Story = {
  args: {
    on: <div>ON</div>,
    off: <div>OFF</div>,
    defaultOn: true,
  },
}
