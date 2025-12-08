import { Button as BaseButton, type ButtonProps } from "@base-ui-components/react/button"

type Props = ButtonProps & {
  variant?: "text" | "contained" | "outlined"
  color?: "primary" | "secondary" | "error"
  wide?: boolean
}

const VARIANT = {
  contained: "",
  outlined: "btn-outline",
  text: "btn-ghost",
}

const COLOR = {
  default: "",
  primary: "btn-primary",
  secondary: "btn-secondary",
  error: "btn-error"
}

export default function Button({ className, color, variant = "contained", wide, ...props }: Props) {
  const klass = [
    "btn",
    VARIANT[variant],
    COLOR[color || "default"],
    wide ? "btn-wide" : "",
    props.disabled ? "btn-disabled" : "",
  ].join(" ")
  return <BaseButton {...props} className={`${klass} ${className}`} />
}
