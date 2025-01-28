import Box from "@mui/material/Box"
import LinearProgress from "@mui/material/LinearProgress"
import Typography from "@mui/material/Typography"
import { useFormContext } from "react-hook-form"
import zxcvbn from "zxcvbn"

export default function PasswordStrength(props: {
  field: string
  userInputs: string[]
  error?: string
}) {
  const { watch } = useFormContext()
  const password: string = watch(props.field) || ""
  const userInputs = watch(props.userInputs)
  const score = zxcvbn(password, userInputs).score
  const normalise = (value: number) => (value * 100) / 4

  const color = (value: number) => {
    if (password.length === 0) return "inherit"
    return (
      {
        0: "error",
        1: "error",
        2: "warning",
        3: "warning",
        4: "success",
      } as const
    )[value]
  }
  const message = (value: number) => {
    if (props.error) return props.error
    if (password.length === 0) return ""
    return {
      0: "very weak",
      1: "very weak",
      2: "weak",
      3: "good",
      4: "strong",
    }[value]
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ width: "100%" }}>
        <LinearProgress
          sx={{ color: "text.secondary", marginLeft: -1, marginRight: -1 }}
          variant="determinate"
          color={color(score)}
          value={normalise(score)}
        />
      </Box>
      <Box sx={{ width: "100%", textAlign: "left" }}>
        <Typography variant="caption" sx={{ color: props.error ? "text.error" : "text.secondary" }}>
          {message(score)}
        </Typography>
      </Box>
    </Box>
  )
}
