import { clsx } from "clsx/lite"
import type { IconProps } from ".."
import Icon from "./Icon"
import Link from "./Link"

export type Props = {
  id: string
  content: React.ReactElement
  sideBarContent: React.ReactElement
}

export default function Drawer({ id, content, sideBarContent }: Props) {
  return (
    <div className="drawer lg:drawer-open">
      <input id={id} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{content}</div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor={id} aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-18 is-drawer-open:w-64">
          <ul className="menu w-full grow">{sideBarContent}</ul>
        </div>
      </div>
    </div>
  )
}

export function DrawerMenu({ children }: React.PropsWithChildren) {
  return <ul className="menu w-full grow">{children}</ul>
}

export type DrawerMenuItemProps = {
  isActive?: boolean
  label: string
  icon: IconProps["name"]
  className?: string
}
export function DrawerMenuItem({
  isActive,
  label,
  icon,
  className,
  ...props
}: DrawerMenuItemProps) {
  return (
    <li className={clsx(isActive ? "menu-active" : "", className)}>
      <Link
        {...props}
        className="no-underline is-drawer-close:tooltip is-drawer-close:tooltip-right"
        data-tip={label}
      >
        <Icon name={icon} />
        <span className="is-drawer-close:hidden">{label}</span>
      </Link>
    </li>
  )
}

export type DrawerToggleProps = Pick<Props, "id">
export function DrawerToggle({ id }: DrawerToggleProps) {
  return (
    <label htmlFor={id} aria-label="open sidebar" className="btn btn-square btn-ghost">
      <Icon name="drawerOpen" />
    </label>
  )
}
