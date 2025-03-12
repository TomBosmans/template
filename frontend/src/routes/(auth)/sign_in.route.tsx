import { createFileRoute, useNavigate } from '@tanstack/react-router'
import SignIn from '../../features/SignIn'
import AuthLayout from '../../layouts/AuthLayout'
import { useSetAtom } from 'jotai'
import { notificationAtom } from '../../features/Notifications/state'

export const Route = createFileRoute('/(auth)/sign_in')({
  component: () => {
    const setNotification = useSetAtom(notificationAtom)
    const navigate = useNavigate()

    return (
      <AuthLayout>
        <SignIn
          onSubmit={() => {
            setNotification({
              severity: 'success',
              message: 'You are signed in!',
            })
            navigate({ to: '.' })
            return { success: true }
          }}
          links={{ signUp: '/sign_up', forgotPassword: '/forgot_password' }}
        />
      </AuthLayout>
    )
  },
})
