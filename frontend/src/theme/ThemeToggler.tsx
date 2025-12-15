import clsx from "clsx/lite"
import { Icon, Toggler, type TogglerProps } from "components"

export type ThemeTogglerProps = Pick<TogglerProps, "position" | "className">
export default function ThemeToggler({ className, position }: ThemeTogglerProps) {
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches

  return (
    <Toggler
      rotate
      value="dark"
      defaultOn={prefersDarkMode}
      position={position}
      className={clsx("theme-controller", className)}
      on={<Icon name="moon" className="w-6 h-6" />}
      off={<Icon name="sun" className="w-6 h-6" />}
    />
  )
}
