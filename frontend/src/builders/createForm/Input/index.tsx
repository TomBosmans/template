import Checkbox, { type CheckboxProps } from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import { type FieldValues, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import TextField, { type TextFieldProps } from "../../../components/TextField"
import type { Params } from "../types"
import PasswordField from "./PasswordField"
import TelField from "./TelField"

type InputProps<T extends FieldValues> =
  | ({ type: "password"; showStrength?: boolean; userInputs?: Array<keyof T> } & TextFieldProps)
  | ({ type: "checkbox" } & CheckboxProps)
  | ({ type?: "tel" | "text" | "email" } & TextFieldProps)

export default function createInput<T extends FieldValues>(params: Params<T>) {
  return (props: InputProps<T> & { id: keyof T }) => {
    const { t } = useTranslation("translation", { keyPrefix: `form.${params.name}.${props.id}` })
    const {
      register,
      formState: { errors },
    } = useFormContext()

    const placeholder = t("placeholder", { defaultValue: "" })
    const helperText = t(`error.${errors[props.id]?.type}`, {
      defaultValue: errors[props.id]?.message || "",
    })
    const label = t("label")
    const hasError = !!errors[props.id]
    const type = props.type

    switch (type) {
      case "tel":
        return (
          <TelField
            error={hasError}
            placeholder={placeholder}
            label={label}
            {...props}
            {...register(props.id)}
          />
        )
      case "password":
        return (
          <PasswordField
            error={hasError}
            placeholder={placeholder}
            helperText={helperText}
            label={label}
            {...props}
            {...register(props.id)}
          />
        )
      case "checkbox":
        return (
          <FormControlLabel
            control={<Checkbox {...props} {...register(props.id)} />}
            label={label}
          />
        )
      default:
        return (
          <TextField
            error={hasError}
            placeholder={placeholder}
            helperText={helperText}
            label={label}
            {...props}
            {...register(props.id)}
          />
        )
    }
  }
}
