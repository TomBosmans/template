import type { Meta, StoryObj } from "@storybook/react-vite"
import Field from "./Field"

const meta = {
  component: Field,
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof Field>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: "checkbox",
  },
}
