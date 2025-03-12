import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { Form, OnSubmit } from "./form"
import { RoutePath } from "../../utils/routes"
import Link from "../../components/Link"

export default function SignIn(props: {
  onSubmit: OnSubmit
  links: { signUp: RoutePath, forgotPassword: RoutePath }
}) {
  return (
    <Paper sx={{ padding: 5, maxWidth: 444 }}>
      <Form onSubmit={props.onSubmit}>
        <Grid container spacing={2}>
          <Grid size={12} sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>Sign in</Typography>
            <Typography variant="subtitle1">Welcome, please sign in to continue</Typography>
          </Grid>
          <Grid size={12}>
            <Form.Errors />
          </Grid>
          <Grid size={12}>
            <Form.Input id="email" type="email" autoComplete="email" required />
          </Grid>
          <Grid size={12} sx={{ textAlign: "right" }}>
            <Form.Input id="password" type="password" required />
            <Link to={props.links.forgotPassword}>
              Forgot password?
            </Link>
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
            <Link button="outlined" to={props.links.signUp}>Sign up</Link>
          </Grid>
        </Grid>
      </Form>
    </Paper>
  )
}
