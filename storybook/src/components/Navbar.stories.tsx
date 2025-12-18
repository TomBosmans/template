/** biome-ignore-all lint/a11y/useValidAnchor: Just an example */
import type { Meta, StoryObj } from "@storybook/react-vite"
import Avatar from "./Avatar"
import Navbar from "./Navbar"

const meta = {
  component: Navbar,
  tags: ["autodocs"],
} satisfies Meta<typeof Navbar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    start: <a className="btn btn-ghost text-xl">Template</a>,
    end: (
      <>
        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        <div className="dropdown dropdown-end">
          <button tabIndex={0} type="button" className="btn btn-ghost btn-circle avatar">
            <Avatar fallback="TB" />
          </button>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </>
    ),
  },
}

export const Simple: Story = {
  args: { start: <div className="text-xl font-bold"> Template</div> },
}

export const Blank: Story = {}
