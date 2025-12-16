import { createToastManager } from "components"

export type Notification = {
  title: string
  description: string
  severity?: "default" | "success" | "info" | "warning" | "error"
}

export const notificationManager = createToastManager()

export const useNotify =
  () =>
  ({ title, description, severity = "default" }: Notification) => {
    notificationManager.add({
      title,
      description,
      type: severity,
    })
  }
