import type { Meta, StoryObj } from "@storybook/react"
import Select from "../components/Select"

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    defaultValue: { control: "text" },
    className: { control: "text" },
    onValueChange: { action: "value changed" },
  },
}

export default meta

type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    options: [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
      { label: "Cherry", value: "cherry", disabled: true },
    ],
    defaultValue: "banana",
  },
}

export const WithNumberValues: Story = {
  args: {
    options: [
      { label: "One", value: 1 },
      { label: "Two", value: 2 },
      { label: "Three", value: 3 },
    ],
    defaultValue: 2,
  },
}
