import MuiTextField, { type TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField"

export type TextFieldProps = MuiTextFieldProps
export default function TextField(props: TextFieldProps) {
  return <MuiTextField size="small" fullWidth {...props} />
}
