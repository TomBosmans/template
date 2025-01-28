import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { useSetAtom } from "jotai"
import { Form } from "./form"
import { handleForgotPasswordAtom, handleSignInAtom, handleSignUpAtom } from "./state"

export default function SignIn() {
  const handleSignIn = useSetAtom(handleSignInAtom)
  const handleSignUp = useSetAtom(handleSignUpAtom)
  const handleForgotPassword = useSetAtom(handleForgotPasswordAtom)

  return (
    <Form onSubmit={handleSignIn}>
      <Paper sx={{ padding: 5, maxWidth: 444 }}>
        <Grid container spacing={2}>
          <Grid size={12} sx={{ textAlign: "center" }}>
            <Typography variant="h3">Sign In</Typography>
            <Typography variant="subtitle1">Welcome, please sign in to continue</Typography>
          </Grid>
          <Grid size={12}>
            <Form.Errors />
          </Grid>
          <Grid size={12}>
            <Form.Input id="email" type="email" required />
          </Grid>
          <Grid size={12} sx={{ textAlign: "right" }}>
            <Form.Input id="password" type="password" required />
            <Button onClick={handleForgotPassword} variant="text" size="small">
              Forgot password?
            </Button>
          </Grid>
          <Grid size={12}>
            <Form.Input type="checkbox" id="rememberMe" />
          </Grid>
          <Grid size={12}>
            <Form.SubmitButton />
          </Grid>
          <Grid size={12}>
            <Divider>OR</Divider>
          </Grid>
          <Grid size={12}>
            <Button onClick={handleSignUp} variant="outlined" fullWidth>
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Form>
  )
}
