export type Props = {
  start?: React.ReactElement
  end?: React.ReactElement
}
export default function Navbar({ start, end }: Props) {
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">{start}</div>
      <div className="flex gap-2">{end}</div>
    </div>
  )
}
