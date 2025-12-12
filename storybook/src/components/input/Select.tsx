import { Select as BaseSelect } from "@base-ui-components/react/select"
import clsx from "clsx/lite"
import Icon from "../Icon"

export type Props<Value, Multiple extends boolean | undefined> = Omit<
  BaseSelect.Root.Props<Value, Multiple>,
  "items"
> & {
  className?: string
  options: Array<{ label: string; value: Value; disabled?: boolean }>
  checkIcon?: () => React.JSX.Element
  renderValue?: (value: Multiple extends true ? Value[] : Value) => string
}

export default function Select<
  Value extends string | number | null | undefined,
  Multiple extends boolean | undefined = false,
>({ className, options, renderValue, ...props }: Props<Value, Multiple>) {
  const klass = clsx("select", className)

  return (
    <BaseSelect.Root {...props} items={options}>
      <BaseSelect.Trigger className={klass}>
        <BaseSelect.Value>{renderValue}</BaseSelect.Value>
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner alignItemWithTrigger={false} sideOffset={8}>
          <BaseSelect.Popup className="">
            <BaseSelect.List
              render={<ul />}
              className="menu bg-base-200 rounded-box w-[320px] max-h-60 overflow-y-scroll flex-nowrap"
            >
              {options.map((option) => {
                console.log(option.value, props.value)
                return (
                  <BaseSelect.Item
                    render={<li />}
                    disabled={option.disabled}
                    key={option.value?.toString()}
                    value={option.value}
                    className={clsx("menu-item", option.disabled && "menu-disabled")}
                  >
                    <div className="grid items-center grid-cols-[0.75rem_1fr] gap-2">
                      <BaseSelect.ItemIndicator className="col-start-1">
                        {props.checkIcon ? <props.checkIcon /> : <Icon name="chevron" />}
                      </BaseSelect.ItemIndicator>
                      <BaseSelect.ItemText className="col-start-2">
                        {option.label}
                      </BaseSelect.ItemText>
                    </div>
                  </BaseSelect.Item>
                )
              })}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  )
}
