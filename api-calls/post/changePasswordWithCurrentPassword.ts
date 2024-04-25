'use server'
import { type OperationResult } from '@/interfaces/return/OperationResult'
import { cookies } from 'next/headers'

export const changePasswordWithCurrentPassword = async (currentPassword: string, newPassword: string): Promise<OperationResult<string>> => {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'ResetPasswordRequest/change-password')

  url.searchParams.set('currentPassword', currentPassword)
  url.searchParams.set('newPassword', newPassword)

  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    cache: 'no-store',
    headers: {
      Cookie: 'JwtToken=' + cookies().get('JwtToken')?.value
    }
  })

  return await res.json()
}
