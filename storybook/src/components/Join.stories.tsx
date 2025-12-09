import type { Meta, StoryObj } from "@storybook/react-vite"
import Button from "./Button"
import Field from "./input/Field"
import Join from "./Join"

const meta = {
  component: Join,
  tags: ["autodocs"],
} satisfies Meta<typeof Join>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    direction: "vertical",
    children: [
      <Button key="a">button 1</Button>,
      <Button key="b">button 2</Button>,
      <Button key="c">button 2</Button>,
    ],
  },
}

export const FieldWithButton: Story = {
  args: {
    className: "items-center justify-center",
    children: [
      <Field key="d" placeholder="search" type="search" size="m" />,
      <Button key="c" className="rounded-r-full">
        Search
      </Button>,
    ],
  },
}

export const Fields: Story = {
  args: {
    children: [<Field key="e" placeholder="firstName" />, <Field key="f" placeholder="lastName" />],
  },
}
