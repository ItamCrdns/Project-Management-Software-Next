import { type OperationResult } from '@/interfaces/return/OperationResult'

export const requestResetPasswordToken = async (email: string): Promise<OperationResult<string>> => {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'ResetPasswordRequest/request-password-reset')

  url.searchParams.set('email', email)

  const res = await fetch(url, { method: 'POST', cache: 'no-store' })

  return await res.json()
}
