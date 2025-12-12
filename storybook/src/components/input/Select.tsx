import { Select as BaseSelect } from "@base-ui-components/react/select"
import clsx from "clsx/lite"

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
                        {props.checkIcon ? <props.checkIcon /> : <CheckIcon />}
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

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: It is ok
    <svg fill="currentcolor" width="10" height="10" viewBox="0 0 10 10" {...props}>
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
    </svg>
  )
}
