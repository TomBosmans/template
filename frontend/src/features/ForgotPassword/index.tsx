import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { Form, OnSubmit } from "./form"
import Link from "../../components/Link"
import { RoutePath } from "../../utils/routes"

export default function ForgotPassword(props: {
  onSubmit: OnSubmit,
  links: { signIn: RoutePath }
}) {
  return (
    <Paper sx={{ padding: 5, maxWidth: 444 }}>
      <Form onSubmit={props.onSubmit}>
        <Grid container spacing={2}>
          <Grid size={12} sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              <Form.Translate i18nKey="title" />
            </Typography>
            <Typography variant="subtitle1">
              <Form.Translate i18nKey="subtitle" components={{ Link: <Link to={props.links.signIn} /> }} />
            </Typography>
          </Grid>
          <Grid size={12}>
            <Form.Errors />
          </Grid>
          <Grid size={12}>
            <Form.Input id="email" type="email" required />
          </Grid>
          <Grid size={12}>
            <Form.SubmitButton />
          </Grid>
        </Grid>
      </Form>
    </Paper>
  )
}
