import { Select as BaseSelect } from "@base-ui-components/react/select"

type Option<Value> = { value: Value; label: string }
type Props<Value, Multiple extends boolean | undefined> = BaseSelect.Root.Props<Value, Multiple> & {
  options: Array<Option<Value>>
  value: Value
}

export default function Select<Value, Multiple extends boolean | undefined = false>({
  options,
  ...props
}: Props<Value, Multiple>) {
  return (
    <BaseSelect.Root {...props} items={options}>
      <BaseSelect.Trigger className="input cursor-pointer">
        <BaseSelect.Value />
        <BaseSelect.Icon className="absolute right-2 top-1/2 -translate-y-1/2 flex w-4 h-4">
          <ChevronUpDownIcon />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>

      <BaseSelect.Portal>
        <BaseSelect.Positioner side="bottom" alignItemWithTrigger={false} className="picker">
          <BaseSelect.Popup className="bg-base-100 rounded-md shadow-lg text-gray-900 min-w-(--anchor-width) transition-transform duration-150">
            <BaseSelect.List className="py-1 overflow-y-auto max-h-60 scroll-py-6">
              {options.map(({ label, value }) => (
                <BaseSelect.Item
                  key={label}
                  value={value}
                  className="w-full px-3 py-1.5 rounded-md cursor-pointer select-none hover:bg-base-content/10 focus:bg-base-content/10 data-highlighted:bg-primary data-highlighted:text-white transition-colors duration-200"
                >
                  <BaseSelect.ItemText>{label}</BaseSelect.ItemText>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  )
}

function ChevronUpDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.5"
      {...props}
    >
      <path d="M0.5 4.5L4 1.5L7.5 4.5" />
      <path d="M0.5 7.5L4 10.5L7.5 7.5" />
    </svg>
  )
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg fill="currentcolor" width="10" height="10" viewBox="0 0 10 10" {...props}>
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
    </svg>
  )
}
