import { clsx } from "clsx/lite"
import { forwardRef } from "react"

const VARIANT = {
  default: "link",
  contained: "btn",
  outlined: "btn btn-outline",
  text: "btn btn-ghost",
} as const

const COLOR = {
  default: {
    default: "",
    primary: "link-primary",
    secondary: "link-secondary",
    error: "link-error",
  },
  button: {
    default: "",
    primary: "btn-primary",
    secondary: "btn-secondary",
    error: "btn-error",
  },
}

export type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: keyof typeof VARIANT
  color?: keyof (typeof COLOR)["default"]
}

const Link = forwardRef<HTMLAnchorElement, Props>(
  ({ className, variant = "default", color = "default", ...props }, ref) => {
    const colorClassName = variant === "default" ? COLOR.default[color] : COLOR.button[color]
    const klass = clsx(VARIANT[variant], colorClassName, className)
    return <a {...props} ref={ref} className={klass} />
  },
)
Link.displayName = "Link"
export default Link
