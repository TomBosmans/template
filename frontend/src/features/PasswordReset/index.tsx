import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { z } from "zod"
import createForm from "../../builders/createForm"

export default function PasswordReset() {
  const { Form } = createForm({
    schema: z.object({
      password: z.string(),
      passwordConfirmation: z.string(),
    }),
    name: "passwordReset",
  })

  return (
    <Form onSubmit={() => null}>
      <Paper sx={{ padding: 5, maxWidth: 444 }}>
        <Grid container spacing={2}>
          <Grid size={12} sx={{ textAlign: "center" }}>
            <Typography variant="h3">Password Reset</Typography>
            <Typography variant="subtitle1">Fill in a new password</Typography>
          </Grid>
          <Grid size={12}>
            <Form.Errors />
          </Grid>
          <Grid size={12}>
            <Form.Input id="password" type="password" required />
          </Grid>
          <Grid size={12}>
            <Form.Input id="passwordConfirmation" type="password" required />
          </Grid>
          <Grid size={12}>
            <Button type="submit" variant="contained" fullWidth>
              Reset Password
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Form>
  )
}
