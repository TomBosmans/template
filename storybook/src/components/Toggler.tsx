import { Field } from "@base-ui-components/react/field"
import clsx from "clsx/lite"
import { useState } from "react"

export type Props = {
  onToggle?: (on: boolean) => void | Promise<void>
  defaultOn?: boolean
  rotate?: boolean
  flip?: boolean
  value?: string
  on: React.JSX.Element | string
  off: React.JSX.Element | string
  className?: string
  position?: "top-left" | "default"
}

const POSITION = {
  default: "",
  "top-left": "fixed top-0 left-0 mt-2 ml-2",
}

export default function Toggler({
  onToggle,
  rotate,
  flip,
  className,
  value,
  on,
  off,
  position = "default",
  defaultOn = false,
}: Props) {
  const [isOn, setIsOn] = useState(defaultOn)
  const klass = clsx("swap", rotate && "swap-rotate", flip && "swap-flip", POSITION[position])
  const handleChange = () => {
    setIsOn(!isOn)
    onToggle?.(!isOn)
  }

  return (
    <Field.Root>
      <Field.Label className={klass}>
        <Field.Control
          className={className}
          onChange={handleChange}
          checked={isOn}
          value={value}
          type="checkbox"
        />
        <div className="swap-on">{on}</div>
        <div className="swap-off">{off}</div>
      </Field.Label>
    </Field.Root>
  )
}
