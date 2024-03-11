'use server'
import { type Message } from '@/hooks/useFormState'
import { requestResetPasswordToken } from '../requestResetPasswordToken'
import { redirect } from 'next/navigation'

export const submitTokenRequest = async (email: string): Promise<Message> => {
  if (email === '') {
    return { type: 'client', message: 'EmailError' }
  }

  const { success, message, data } = await requestResetPasswordToken(email)

  if (success) {
    redirect('/forgotpassword/validate?request=' + data)
  } else {
    return { type: 'server', message: message ?? '' }
  }
}
