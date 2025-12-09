import { Fieldset as BaseFieldset } from "@base-ui-components/react/fieldset"
import clsx from "clsx/lite"

export type Props = React.PropsWithChildren<{
  legend?: string
  className?: string
  border?: boolean
}>

export default function Fieldset({ legend, border, children, className }: Props) {
  const klass = clsx(
    "fieldset",
    border && "bg-base-200 border-base-300 rounded-box w-xs border p-4",
    className,
  )
  return (
    <BaseFieldset.Root className={klass}>
      {legend && (
        <BaseFieldset.Legend render={<legend />} className="fieldset-legend">
          {legend}
        </BaseFieldset.Legend>
      )}
      {children}
    </BaseFieldset.Root>
  )
}
