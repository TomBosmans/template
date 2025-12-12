import type { Meta, StoryObj } from "@storybook/react"
import Icon from "./index.tsx"

const meta: Meta<typeof Icon> = {
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text" },
  },
}

export default meta

type Story = StoryObj<typeof Icon>

export const Chevron: Story = { args: { name: "chevron", className: "h-10 w-10" } }
export const Moon: Story = { args: { name: "moon", className: "h-10 w-10" } }
export const Sun: Story = { args: { name: "sun", className: "h-10 w-10" } }
