import type { Meta, StoryObj } from "@storybook/react"
import Select from "./Select"

const meta: Meta<typeof Select> = {
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
    multiple: true,
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

export const ManyOptions: Story = {
  args: {
    multiple: true,
    options: [
      { label: "Select font...", value: null },
      { label: "Sans-serif", value: "sans" },
      { label: "Serif", value: "serif" },
      { label: "Monospace", value: "mono" },
      { label: "Cursive", value: "cursive" },
      { label: "Arial", value: "Arial, sans-serif" },
      { label: "Helvetica", value: "Helvetica, sans-serif" },
      { label: "Verdana", value: "Verdana, sans-serif" },
      { label: "Tahoma", value: "Tahoma, sans-serif" },
      { label: "Trebuchet MS", value: '"Trebuchet MS", sans-serif' },
      { label: "Georgia", value: "Georgia, serif" },
      { label: "Times New Roman", value: '"Times New Roman", serif' },
      { label: "Garamond", value: "Garamond, serif" },
      { label: "Courier New", value: '"Courier New", monospace' },
      { label: "Lucida Console", value: '"Lucida Console", monospace' },
      { label: "Brush Script MT", value: '"Brush Script MT", cursive' },
      { label: "Comic Sans MS", value: '"Comic Sans MS", cursive' },
      { label: "Impact", value: "Impact, sans-serif" },
      { label: "Futura", value: "Futura, sans-serif" },
      { label: "Palatino", value: "Palatino, serif" },
      { label: "Optima", value: "Optima, sans-serif" },
      { label: "Gill Sans", value: '"Gill Sans", sans-serif' },
      { label: "Bookman", value: "Bookman, serif" },
      { label: "Didot", value: "Didot, serif" },
      { label: "Rockwell", value: "Rockwell, serif" },
      { label: "Franklin Gothic", value: '"Franklin Gothic", sans-serif' },
      { label: "Tahoma", value: "Tahoma, sans-serif" },
      { label: "Palatino Linotype", value: '"Palatino Linotype", serif' },
      { label: "Century Gothic", value: '"Century Gothic", sans-serif' },
    ],
  },
}
