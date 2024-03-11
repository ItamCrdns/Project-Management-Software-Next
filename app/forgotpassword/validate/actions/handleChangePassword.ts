'use server'
import { type Message } from '@/hooks/useFormState'
import { changePassword } from '../changePassword'

export const handleChangePassword = async (token: string, email: string, newPassword?: string, newPasswordConfirm?: string): Promise<Message> => {
  if (newPassword === undefined || newPassword === '') {
    return { type: 'passwordError', message: 'Please enter a password' }
  }

  if (newPasswordConfirm === undefined || newPasswordConfirm === '') {
    return { type: 'confirmPasswordError', message: 'Please confirm your password' }
  }

  if (newPassword !== newPasswordConfirm) {
    return { type: 'confirmPasswordError', message: 'Passwords do not match' }
  }

  const { message, success, data } = await changePassword(email, token, newPassword)

  if (success && data !== undefined) {
    return { type: 'success', message: data } // Where the data we send its the username
  } else {
    return { type: 'error', message: message ?? '' }
  }
}
