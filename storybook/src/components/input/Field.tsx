import { Field as BaseField, type FieldControlProps } from "@base-ui-components/react/field"
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
  value?: FieldControlProps["value"]
  onChange?: FieldControlProps["onChange"]
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
  onChange,
  value,
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
        value={value}
        onChange={onChange}
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
