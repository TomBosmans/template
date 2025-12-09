/// <reference types="vite-plugin-svgr/client" />

import MoonIcon from "./assets/icons/moon.svg?react"
import SunIcon from "./assets/icons/sun.svg?react"

type SVGProps = React.SVGProps<SVGSVGElement> & {
  title?: string
  titleId?: string
  desc?: string
  descId?: string
}

const ICONS = {
  sun: SunIcon,
  moon: MoonIcon,
} as const

export type IconProps = SVGProps & {
  name: keyof typeof ICONS
}

export default function Icon({ name, ...props }: IconProps) {
  const Component = ICONS[name]
  return <Component {...props} />
}
