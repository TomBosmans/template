import { clsx } from "clsx/lite"

export type Props = React.PropsWithChildren & { className?: string }
export default function Card({ children, className }: Props) {
  const klass = clsx("card bg-base-200", className)
  return (
    <div className={klass}>
      <div className="card-body">{children}</div>
    </div>
  )
}
