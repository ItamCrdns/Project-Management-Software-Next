'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const logout = async (): Promise<void> => {
  cookies().delete('JwtToken')

  redirect('/login')
}
