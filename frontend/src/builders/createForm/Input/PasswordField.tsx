import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import InputAdornment from "@mui/material/InputAdornment"
import Stack from "@mui/material/Stack"
import { useState } from "react"
import type { FieldValues } from "react-hook-form"
import TextField, { type TextFieldProps } from "../../../components/TextField"
import PasswordStrength from "./PasswordStrength"

export default function PasswordField<T extends FieldValues>({
  showStrength,
  userInputs,
  ...props
}: TextFieldProps & { id: keyof T; showStrength?: boolean; userInputs?: Array<keyof T> }) {
  const [showPassword, setShowPassword] = useState(false)
  const handleClick = () => setShowPassword(!showPassword)

  return (
    <Stack>
      <TextField
        {...props}
        type={showPassword ? "text" : "password"}
        helperText={
          showStrength ? (
            <PasswordStrength
              field={props.id}
              userInputs={userInputs as string[]}
              error={props.helperText as string}
            />
          ) : (
            props.helperText
          )
        }
        slotProps={{
          formHelperText: { component: showStrength ? "div" : "p" },
          input: {
            endAdornment: (
              <InputAdornment position="start" sx={{ cursor: "pointer" }} onClick={handleClick}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </InputAdornment>
            ),
          },
        }}
      />
    </Stack>
  )
}
