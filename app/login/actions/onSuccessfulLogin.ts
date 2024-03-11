'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const onSuccessfulLogin = async (token: string): Promise<void> => {
  cookies().set({
    name: 'JwtToken',
    value: token,
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 1 week
  })
  redirect('/dashboard')
}
