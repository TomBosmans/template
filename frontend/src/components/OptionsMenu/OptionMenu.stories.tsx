import type { Meta, StoryObj } from "@storybook/react"
import Component from "."
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const meta: Meta<typeof Component> = {
  component: Component,
}

export default meta

type Story = StoryObj<typeof Component>

export const General: Story = {
  args: {
    options: [
      [{ label: "Profile", onClick: () => alert("Profile") }, { label: "My account", onClick: () => alert("My account") }],
      [{ label: "Add another account", onClick: () => alert("add another account") }, { label: "Settings", onClick: () => alert("settings") }],
      [{ label: "logout", onClick: () => alert("Sign out"), icon: LogoutRoundedIcon }],
    ]
  }
}
