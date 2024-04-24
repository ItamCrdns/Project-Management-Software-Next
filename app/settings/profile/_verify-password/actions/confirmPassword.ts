'use server'
import { type OperationResult } from '@/interfaces/return/OperationResult'
import { postPatchCookieOptions } from '@/utility/cookieOptions'

export const confirmPassword = async (password: string): Promise<OperationResult<boolean>> => {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'Employee/me/confirm-password')

  const res = await fetch(url, postPatchCookieOptions(JSON.stringify({ password }), 'application/json'))

  return await res.json()
}
