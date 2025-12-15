import { Card } from "components"
import ThemeToggler from "../theme/ThemeToggler"

type Props = React.PropsWithChildren<{
  title: string
}>

export default function AuthLayout({ children, title }: Props) {
  return (
    <div className="flex min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8">
      <ThemeToggler position="top-left" />
      <Card>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm prose text-center">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            className="mx-auto h-10 w-auto"
          />
          <h2>{title}</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">{children}</div>
      </Card>
    </div>
  )
}
