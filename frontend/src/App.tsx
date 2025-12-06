import { useState } from "react"
import viteLogo from "/vite.svg"
import reactLogo from "./assets/react.svg"
import "./App.css"
import I18n from "./i18n/I18n"
import { I18nSelector } from "./i18n/I18nSelector"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <I18nSelector />
      <h1>
        <I18n keyName="title" />
      </h1>
      <div className="card">
        <button type="button" onClick={() => setCount((count) => count + 1)}>
          <I18n keyName="count" params={{ count }} />
        </button>
        <p>
          <I18n keyName="hmr-message" params={{ code: <code /> }} />
        </p>
      </div>
      <p className="read-the-docs">
        <I18n keyName="learn-more" />
      </p>
    </>
  )
}

export default App
