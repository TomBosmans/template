import type { ErrorComponentProps } from "@tanstack/react-router"
import { Button } from "components"
import I18n from "../../i18n/I18n"
import ThemeToggler from "../../theme/ThemeToggler"
import NavLink from "../components/NavLink"

export default function ErrorPage({ reset }: ErrorComponentProps) {
  return (
    <>
      <ThemeToggler position="top-left" />
      <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center prose">
          <p className="text-base font-semibold text-indigo-400">500</p>
          <h1>
            <I18n keyName="pages.error.title" default="Something went wrong" />
          </h1>
          <p>
            <I18n keyName="pages.error.message" default="Sorry, something went wrong there." />
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button variant="contained" color="primary" onClick={reset}>
              <I18n keyName="common.actions.retry" default="Try again" />
            </Button>
            <NavLink to="/">
              <I18n
                keyName="common.actions.support"
                default="Contact support <span>&rarr;</span>"
                params={{ span: <span aria-hidden="true" /> }}
              />
            </NavLink>
          </div>
        </div>
      </main>
    </>
  )
}
