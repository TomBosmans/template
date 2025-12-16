import { ToastList } from "components"
import { notificationManager } from "./notifications.state"

export default function Notifications() {
  return <ToastList toastManager={notificationManager} />
}
