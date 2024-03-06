'use server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { authenticateUser } from '../authenticateUser'

export const login = async (formData: FormData): Promise<string> => {
  const username = formData.get('username')?.toString()
  const password = formData.get('password')?.toString()

  if (username === undefined || password === undefined) {
    return 'Please enter a username and password'
  }

  const { result, message, token } = await authenticateUser(username, password)

  if (result.authenticated === true) {
    cookies().set({
      name: 'JwtToken',
      value: token,
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 1 week
    })
    redirect('/dashboard')
  } else {
    return message
  }
}
