import clsx from "clsx/lite"

type Option<Value> = { value: Value; label: string; disabled?: boolean }

export type Props<Value> = {
  value?: Value
  defaultValue?: Value
  options: Array<Option<Value>>
  className?: string
  onValueChange: (value: Value) => void | Promise<void>
}

export default function Select<Value extends string | number | string[] | undefined>({
  className,
  options,
  onValueChange,
  ...props
}: Props<Value>) {
  const klass = clsx("select", className)

  const handleValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = options.find((option) => option.value?.toString() === e.target.value)
    return option && onValueChange(option.value)
  }

  return (
    <select {...props} className={klass} onChange={handleValueChange}>
      {options.map((option) => (
        <option key={option.value?.toString()} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
