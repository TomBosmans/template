import clsx from "clsx/lite"
import React from "react"

export type Props = {
  children: Array<React.ReactElement<{ className?: string }>>
  direction?: "vertical" | "horizontal" | "responsive"
  className?: string
}

export default function Join({ children, direction, className }: Props) {
  const klass = clsx(
    "join",
    direction === "vertical" && "join-vertical",
    direction === "responsive" && "join-vertical lg:join-horizontal",
    className,
  )

  return (
    <div className={klass}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child

        const childClassName = clsx(child.props.className, "join-item")
        return React.cloneElement(child, { className: childClassName })
      })}
    </div>
  )
}
