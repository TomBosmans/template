import { Button } from "components"
import { useState } from "react"
import viteLogo from "/vite.svg"
import reactLogo from "./assets/react.svg"
import { useProfile } from "./auth/auth.state"
import SignInForm from "./auth/SignInForm"
import SignOutButton from "./auth/SignOutButton"
import SignUpForm from "./auth/SignUpForm"
import I18n from "./i18n/I18n"
import I18nSelector from "./i18n/I18nSelector"
import ThemeToggler from "./theme/ThemeToggler"

function App() {
  const [count, setCount] = useState(0)
  const profile = useProfile()

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener">
          <img src={viteLogo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener">
          <img src={reactLogo} alt="React logo" />
        </a>
      </div>
      <I18nSelector />
      <ThemeToggler />
      <h1>
        <I18n keyName="title" />
      </h1>
      <div>
        <Button wide onClick={() => setCount((count) => count + 1)}>
          <I18n keyName="count" params={{ count }} />
        </Button>
        <p>
          <I18n keyName="hmr-message" params={{ code: <code /> }} />
        </p>
      </div>
      <p>
        <I18n keyName="learn-more" />
      </p>
      {JSON.stringify(profile, null, 2)}
      <SignUpForm />
      <SignInForm />
      <SignOutButton />
    </>
  )
}

export default App
