import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { z } from "zod"
import createForm from "../../builders/createForm"

const schema = z.object({
  email: z.preprocess((x) => (x === "" ? undefined : x), z.string().email()),
  firstName: z.preprocess((x) => (x === "" ? undefined : x), z.string()),
  lastName: z.preprocess((x) => (x === "" ? undefined : x), z.string()),
  password: z.preprocess((x) => (x === "" ? undefined : x), z.string()),
  mobile: z.preprocess((x) => (x === "" ? undefined : x), z.string()),
  passwordConfirmation: z.preprocess((x) => (x === "" ? undefined : x), z.string()),
})

type Props = {
  onSignUp: (data: z.input<typeof schema>) => Promise<unknown> | unknown
  onSignIn?: () => void
}

const { Form } = createForm({ schema, name: "signUp" })

export default function SignUp(props: Props) {
  return (
    <Form onSubmit={(data) => console.log(data)}>
      <Paper sx={{ padding: 5, maxWidth: 444 }}>
        <Grid container spacing={2}>
          <Grid size={12} sx={{ textAlign: "center" }}>
            <Typography variant="h3">Sign Up</Typography>
            <Typography variant="subtitle1">Welcome, please sign up to continue</Typography>
          </Grid>
          <Grid size={12}>
            <Form.Errors />
          </Grid>
          <Grid size={12}>
            <Form.Input required id="email" type="email" />
          </Grid>
          <Grid size={12}>
            <Form.Input required id="firstName" />
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
          {props.onSignIn && (
            <Grid size={12}>
              <Divider>OR</Divider>
            </Grid>
          )}
          {props.onSignIn && (
            <Grid size={12}>
              <Button variant="outlined" fullWidth>
                Sign in
              </Button>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Form>
  )
}
