import type { Meta, StoryObj } from "@storybook/react-vite"
import Link from "./Link"

const meta = {
  component: Link,
  tags: ["autodocs"],
  args: { children: "hello world", href: "https://www.google.com", target: "_blank" },
} satisfies Meta<typeof Link>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const DefaultPrimary: Story = { args: { color: "primary" } }
export const Button: Story = { args: { variant: "contained" } }
export const ButtonPrimary: Story = { args: { variant: "contained", color: "primary" } }
