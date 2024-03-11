import { type OperationResult } from '@/interfaces/return/OperationResult'

export const changePassword = async (email: string, token: string, newPassword: string): Promise<OperationResult<string>> => {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'ResetPasswordRequest/reset-password')

  url.searchParams.set('email', email)
  url.searchParams.set('token', token)
  url.searchParams.set('newPassword', newPassword)

  const res = await fetch(url, { method: 'POST' })

  return await res.json()
}
