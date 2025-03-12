import { createFileRoute } from '@tanstack/react-router'
import AppLayout from '../../layouts/AppLayout'

export const Route = createFileRoute('/(app)/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AppLayout>
      <div>Hello "/"!</div>
    </AppLayout>
  )
}
