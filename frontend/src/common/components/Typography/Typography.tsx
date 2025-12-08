interface TypographyProps {
  children: React.ReactNode
  variant?: "h1" | "h2" | "h3" | "p" | "small"
  className?: string
}

export default function Typography({ children, variant = "p", className = "" }: TypographyProps) {
  let baseClass = ""

  switch (variant) {
    case "h1":
      baseClass = "text-4xl font-bold"
      break
    case "h2":
      baseClass = "text-3xl font-semibold"
      break
    case "h3":
      baseClass = "text-2xl font-medium"
      break
    case "small":
      baseClass = "text-sm"
      break
    case "p":
    default:
      baseClass = "text-base"
  }

  return <p className={`${baseClass} ${className}`}>{children}</p>
}
