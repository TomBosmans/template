import type { Meta, StoryObj } from "@storybook/react-vite"
import Avatar from "./Avatar"

const meta = {
  component: Avatar,
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: "fill in some url to an image",
    fallback: "SG",
  },
}

export const Fallback: Story = {
  args: {
    fallback: "SG",
  },
}
