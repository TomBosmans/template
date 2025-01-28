import "../i18n"
import type { Preview } from "@storybook/react"

import { CssBaseline, ThemeProvider } from "@mui/material"
import { withThemeFromJSXProvider } from "@storybook/addon-themes"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

import theme from "../src/theme"

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  tags: ["autodocs"],

  decorators: [
    withThemeFromJSXProvider({
      GlobalStyles: CssBaseline,
      Provider: ThemeProvider,
      themes: {
        light: theme,
        dark: theme,
      },
      defaultTheme: "light",
    }),
  ],
}

export default preview
