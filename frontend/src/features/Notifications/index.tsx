import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar"
import { useAtom, useAtomValue } from "jotai"
import { notificationAtom, openAtom } from "./state"
import Alert from "@mui/material/Alert"

export default function Notifications() {
  const [open, setOpen] = useAtom(openAtom)
  const notification = useAtomValue(notificationAtom)

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason !== 'clickaway') setOpen(false);
  };


  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={notification?.severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {notification?.message}
      </Alert>
    </Snackbar>
  )
}
