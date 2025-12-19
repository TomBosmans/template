import type { Header, RowData } from "@tanstack/react-table"
import clsx from "clsx/lite"

export default function Resizer<Data extends RowData>({
  header,
}: {
  header: Header<Data, unknown>
}) {
  return (
    <hr
      aria-orientation="vertical"
      tabIndex={0}
      onDoubleClick={() => header.column.resetSize()}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      className={clsx(
        "absolute right-0 top-0 border-t-0",
        "w-0.5 h-[calc(100%-1rem)] my-2",
        "cursor-col-resize select-none touch-none",
        "bg-base-content/30 opacity-50 hover:opacity-100",
        header.column.getIsResizing() && "bg-primary opacity-100",
        "transition-opacity duration-150",
      )}
    />
  )
}
