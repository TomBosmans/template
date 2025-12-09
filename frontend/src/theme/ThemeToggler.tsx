import { Toggler } from "components"
import Icon from "../Icon"

export default function ThemeToggler() {
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches

  return (
    <Toggler
      rotate
      value="dark"
      defaultOn={prefersDarkMode}
      className="theme-controller"
      on={<Icon name="moon" className="w-6 h-6" />}
      off={<Icon name="sun" className="w-6 h-6" />}
    />
  )
}
