import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { z } from "zod"
import createForm from "../../builders/createForm"

export default function ForgotPassword() {
  const { Form } = createForm({
    schema: z.object({
      email: z.string().email(),
    }),
    name: "forgotPassword",
  })

  return (
    <Paper sx={{ padding: 5, maxWidth: 444 }}>
      <Form onSubmit={() => null}>
        <Grid container spacing={2}>
          <Grid size={12} sx={{ textAlign: "center" }}>
            <Typography variant="h3">Forgot Password?</Typography>
            <Typography variant="subtitle1">Fill in you email</Typography>
          </Grid>
          <Grid size={12}>
            <Form.Errors />
          </Grid>
          <Grid size={12}>
            <Form.Input id="email" label="email" type="email" />
          </Grid>
          <Grid size={12}>
            <Button type="submit" variant="contained" fullWidth>
              Send Reset Password request
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Paper>
  )
}
