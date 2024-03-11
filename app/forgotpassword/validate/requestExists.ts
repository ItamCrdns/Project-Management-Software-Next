import { type OperationResult } from '@/interfaces/return/OperationResult'

export const requestExists = async (reqGuid: string): Promise<OperationResult<string>> => {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'ResetPasswordRequest/exists/' + reqGuid)

  const res = await fetch(url, { method: 'GET', cache: 'no-store' })

  return await res.json()
}
