/** biome-ignore-all lint/a11y/useValidAnchor: Just an example */
import type { Meta, StoryObj } from "@storybook/react-vite"
import Drawer, { DrawerMenu, DrawerToggle } from "./Drawer.tsx"
import Icon from "./Icon/index.tsx"
import Navbar from "./Navbar.tsx"

const meta = {
  component: Drawer,
  tags: ["autodocs"],
} satisfies Meta<typeof Drawer>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: "default",
    content: (
      <>
        <Navbar
          start={
            <>
              {/** biome-ignore lint/correctness/useUniqueElementIds: Just an example */}
              <DrawerToggle id="default" />
              <a className="btn btn-ghost text-xl">Template</a>
            </>
          }
        />
        <main className="m-4">Hello world!</main>
      </>
    ),
    sideBarContent: (
      <DrawerMenu>
        <li>
          <button
            type="button"
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Home"
          >
            <Icon name="home" />
            <span className="is-drawer-close:hidden">Home</span>
          </button>
        </li>
        <li>
          <button
            type="button"
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Settings"
          >
            <Icon name="settings" />
            <span className="is-drawer-close:hidden">Settings</span>
          </button>
        </li>
      </DrawerMenu>
    ),
  },
}
