import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"
import "./i18n"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          error: {
            validation: {
              invalid_type: "expected {{expected}}, but received {{received}}",
            },
          },
          form: {
            forgotPassword: {
              title: "Forgot password?",
              subtitle: "Remember password? <Link>sign in</Link>",
              email: {
                label: "E-Mail",
              },
              submit: { label: "Send reset password mail" }
            },
            signIn: {
              submit: {
                label: "Sign in",
              },
              email: {
                label: "E-Mail",
                placeholder: "Example: john.doe@example.com",
                error: {
                  invalid_type: "E-mail is required",
                },
              },
              password: {
                label: "Password",
                error: {
                  invalid_type: "oh no",
                },
              },
              rememberMe: {
                label: "Remember me",
              },
            },
            signUp: {
              email: { label: "E-Mail" },
              firstName: { label: "First Name" },
              lastName: { label: "Last Name" },
              password: { label: "Password" },
              passwordConfirmation: { label: "password confirmation" },
            },
          },
        },
      },
    },
    debug: false,
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  })

export default i18n
