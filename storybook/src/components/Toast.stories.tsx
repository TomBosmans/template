import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import Button from "./Button"
import Toast, { createToastManager } from "./Toast"

const toastManager = createToastManager()
const meta = {
  component: Toast,
  tags: ["autodocs"],
} satisfies Meta<typeof Toast>

export default meta

type Story = StoryObj<typeof meta>

// biome-ignore lint/style/useComponentExportOnlyModules: It is ok here
function ToastButton({ type }: { type: string }) {
  const [count, setCount] = useState(0)

  function createToast() {
    setCount((prev) => prev + 1)
    toastManager.add({
      title: `Toast ${count + 1} created`,
      description: "This is a toast notification.",
      type,
    })
  }

  return <Button onClick={createToast}>Create toast</Button>
}

export const Success: Story = {
  args: { toastManager },
  render: () => {
    return (
      <>
        <Toast toastManager={toastManager} />
        <ToastButton type="success" />
      </>
    )
  },
}

export const Warning: Story = {
  args: { toastManager },
  render: () => {
    return (
      <>
        <Toast toastManager={toastManager} />
        <ToastButton type="warning" />
      </>
    )
  },
}

export const Info: Story = {
  args: { toastManager },
  render: () => {
    return (
      <>
        <Toast toastManager={toastManager} />
        <ToastButton type="info" />
      </>
    )
  },
}

export const Errorr: Story = {
  args: { toastManager },
  render: () => {
    return (
      <>
        <Toast toastManager={toastManager} />
        <ToastButton type="error" />
      </>
    )
  },
}
export const Default: Story = {
  args: { toastManager },
  render: () => {
    return (
      <>
        <Toast toastManager={toastManager} />
        <ToastButton type="default" />
      </>
    )
  },
}
