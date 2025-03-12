import { createFileRoute } from '@tanstack/react-router'
import AuthLayout from '../../layouts/AuthLayout'
import ForgotPassword from '../../features/ForgotPassword'

export const Route = createFileRoute('/(auth)/forgot_password')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AuthLayout>
      <ForgotPassword
        onSubmit={() => ({ success: true })}
        links={{ signIn: '/sign_in' }}
      />
    </AuthLayout>
  )
}
