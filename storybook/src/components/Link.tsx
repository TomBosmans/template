import { clsx } from "clsx/lite"
import type { AnchorHTMLAttributes } from "react"

const VARIANT = {
  default: "link",
  contained: "btn no-underline",
  outlined: "btn btn-outline no-underline",
  text: "btn btn-ghost no-underline",
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
} as const

export type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: keyof typeof VARIANT
  color?: keyof (typeof COLOR)["default"]
}

export default function Link({
  className,
  variant = "default",
  color = "default",
  ref,
  ...props
}: Props & { ref?: React.Ref<HTMLAnchorElement> }) {
  const colorClassName = variant === "default" ? COLOR.default[color] : COLOR.button[color]

  const klass = clsx(VARIANT[variant], colorClassName, className)

  return <a {...props} ref={ref} className={klass} />
}
