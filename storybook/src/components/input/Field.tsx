import { Field as BaseField } from "@base-ui-components/react/field"
import clsx from "clsx/lite"

const SIZE = {
  xs: "input-xs",
  sm: "input-sm",
  m: "input-md",
  lg: "input-lg",
  xl: "input-xl",
} as const

export type Props = {
  label?: string
  required?: boolean
  error?: string
  description?: string
  size?: keyof typeof SIZE
  disabled?: boolean
  placeholder?: string
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"]
  validate?: boolean
  className?: string
}

export default function Field({
  disabled,
  label,
  required,
  placeholder,
  error,
  size = "m",
  description,
  type,
  validate,
  className,
}: Props) {
  const inputKlass = clsx(
    "input",
    validate && "validator",
    error && "input-error",
    SIZE[size],
    disabled && "input-disabled",
    className,
  )

  return (
    <BaseField.Root className="fieldset">
      <BaseField.Label className="label">
        {label}
        {required && "*"}
      </BaseField.Label>
      <BaseField.Control
        type={type}
        className={inputKlass}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
      />
      {description && (
        <BaseField.Description className="label">{description}</BaseField.Description>
      )}
      {error && <BaseField.Label className="label text-error">{error}</BaseField.Label>}
      {validate && <BaseField.Error className="validator-hint" />}
    </BaseField.Root>
  )
}
