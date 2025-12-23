import ChevronIcon from "./ChevronIcon"
import DrawerClosedIcon from "./DrawerClosedIcon"
import DrawerOpenIcon from "./DrawerOpenIcon"
import HomeIcon from "./HomeIcon"
import type { SVGProps } from "./Icon.types"
import MoonIcon from "./MoonIcon"
import SettingsIcon from "./SettingsIcon"
import SunIcon from "./SunIcon"
import XIcon from "./XIcon"

const ICONS = {
  chevron: ChevronIcon,
  moon: MoonIcon,
  sun: SunIcon,
  x: XIcon,
  drawerOpen: DrawerOpenIcon,
  drawerClosed: DrawerClosedIcon,
  home: HomeIcon,
  settings: SettingsIcon,
} as const

export type Props = SVGProps & {
  name: keyof typeof ICONS
}

export default function Icon({ name, ...props }: Props) {
  const Component = ICONS[name]
  return <Component {...props} />
}
