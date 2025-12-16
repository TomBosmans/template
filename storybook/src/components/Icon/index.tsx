import ChevronIcon from "./ChevronIcon"
import type { SVGProps } from "./Icon.types"
import MoonIcon from "./MoonIcon"
import SunIcon from "./SunIcon"
import XIcon from "./XIcon"

const ICONS = {
  chevron: ChevronIcon,
  moon: MoonIcon,
  sun: SunIcon,
  x: XIcon,
} as const

export type Props = SVGProps & {
  name: keyof typeof ICONS
}

export default function Icon({ name, ...props }: Props) {
  const Component = ICONS[name]
  return <Component {...props} />
}
