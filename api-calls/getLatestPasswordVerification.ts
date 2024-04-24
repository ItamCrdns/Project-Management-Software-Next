import { type ApiResponse } from '@/interfaces/apiResponse'
import { type OperationResult } from '@/interfaces/return/OperationResult'
import { cookies } from 'next/headers'

export const getLatestPasswordVerification = async (): Promise<ApiResponse<OperationResult<string> | null>> => {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'Employee/me/password-last-verification')

  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store',
    headers: {
      Cookie: 'JwtToken=' + cookies().get('JwtToken')?.value
    },
    next: {
      tags: ['passwordverification']
    }
  })

  if (res.ok) {
    return {
      data: await res.json(),
      status: res.status
    }
  }

  return {
    data: null,
    status: res.status
  }
}
