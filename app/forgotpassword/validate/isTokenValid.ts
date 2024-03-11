import { type OperationResult } from '@/interfaces/return/OperationResult'

export const isTokenValid = async (token: string, requestGuid: string): Promise<OperationResult<string>> => {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'ResetPasswordRequest/is-token-valid')

  const params = new URLSearchParams({
    token,
    requestGuid
  })

  url.search = params.toString()

  if (token.length !== 6) {
    return {
      success: false,
      message: 'Token must be at least 6-digit. Please try again.'
    }
  }

  const res = await fetch(url.toString(), {
    method: 'GET'
  })

  return await res.json()
}
