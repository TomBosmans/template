import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { Form, OnSubmit } from "./form"
import Link from "../../components/Link"
import { RoutePath } from "../../utils/routes"

export default function SignUp(props: {
  onSubmit: OnSubmit
  links: { signIn: RoutePath }
}) {
  return (
    <Paper sx={{ padding: 5, maxWidth: 444 }}>
      <Form onSubmit={props.onSubmit}>
        <Grid container spacing={2}>
          <Grid size={12} sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>Sign Up</Typography>
            <Typography variant="subtitle1">
              Create a free account or <Link to="/sign_in">sign in</Link>
            </Typography>
          </Grid>
          <Grid size={12}>
            <Form.Errors />
          </Grid>
          <Grid size={12}>
            <Form.Input required id="email" type="email" autoComplete="email" />
          </Grid>
          <Grid size={12}>
            <Form.Input required id="firstName" autoComplete="firstName" />
          </Grid>
          <Grid size={12}>
            <Form.Input required id="lastName" />
          </Grid>
          <Grid size={12}>
            <Form.Input required id="mobile" type="tel" />
          </Grid>
          <Grid size={12}>
            <Form.Input
              required
              id="password"
              type="password"
              showStrength
              userInputs={["firstName", "lastName"]}
            />
          </Grid>
          <Grid size={12}>
            <Form.Input required id="passwordConfirmation" type="password" />
          </Grid>
          <Grid size={12}>
            <Button type="submit" variant="contained" fullWidth>
              Sign up
            </Button>
          </Grid>
          <Grid size={12} marginTop={3}>
            <Typography>
              By clicking on Sign up button you agree to our <Link>Terms of conditions</Link> and <Link>Policy Privacy</Link>
            </Typography>
          </Grid>
        </Grid>
      </Form>
    </Paper>
  )
}
