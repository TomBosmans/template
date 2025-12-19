/** biome-ignore-all lint/suspicious/noExplicitAny: It is ok here */
import {
  type CellContext,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  type IdentifiedColumnDef,
  type RowData,
  useReactTable,
} from "@tanstack/react-table"
import clsx from "clsx/lite"
import type { JSX } from "react"
import Resizer from "./Resizer"

const columnHelper = createColumnHelper<RowData>()

export type TableColumn<Data extends RowData> = {
  [Key in keyof Data]: {
    header: () => JSX.Element | string
    cell: (info: CellContext<Data, Data[Key]>) => JSX.Element | string | number | null | undefined
  }
}

export type Props<Data extends RowData> = {
  data: Data[]
  columns: TableColumn<Data>
  zebra?: boolean
  className?: string
}
export default function Table<Data extends RowData>({ columns, data, zebra }: Props<Data>) {
  const klass = clsx("table", zebra && "table-zebra")
  const columnDef = Object.entries<IdentifiedColumnDef<any, any>>(columns).map(([key, column]) => {
    return columnHelper.accessor(key, column)
  })
  const table = useReactTable({
    data,
    columns: columnDef as any,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
  })

  return (
    <table className={klass}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="pr-2 relative"
                colSpan={header.colSpan}
                style={{ width: header.getSize() }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
                <Resizer header={header} />
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.footer, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  )
}
