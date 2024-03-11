'use server'
import { authenticateUser } from '../authenticateUser'
import { type Message } from '@/hooks/useFormState'

export const login = async (formData: FormData): Promise<Message> => {
  const username = formData.get('username')?.toString() ?? ''
  const password = formData.get('password')?.toString() ?? ''

  if (username === '' && password === '') {
    return { type: 'client', message: 'BothError' }
  }

  if (username === '') {
    return { type: 'client', message: 'UsernameError' }
  }

  if (password === '') {
    return { type: 'client', message: 'PasswordError' }
  }

  const { result, message, token } = await authenticateUser(username, password)

  if (result.authenticated === true) {
    return { type: 'authenticated', message: token }
  } else {
    return { type: 'notAuthenticated', message }
  }
}
