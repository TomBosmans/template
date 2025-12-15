import I18n from "../../i18n/I18n"
import ThemeToggler from "../../theme/ThemeToggler"
import NavLink from "../components/NavLink"

export default function NotFoundPage() {
  return (
    <>
      <ThemeToggler position="top-left" />
      <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-400">404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
            <I18n keyName="pages.notFound.title" default="Page not found" />
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty sm:text-xl/8">
            <I18n
              keyName="pages.notFound.message"
              default="Sorry, we couldn’t find the page you’re looking for."
            />
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <NavLink to="/" variant="contained" color="primary">
              <I18n keyName="pages.notFound.actions.back" default="Go back home" />
            </NavLink>
            <NavLink to="/">
              <I18n
                keyName="pages.notFound.actions.support"
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
