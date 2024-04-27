import { type Employee } from '@/interfaces/employee'
import { cookies } from 'next/headers'

export const getMyEmployee = async (): Promise<{ data: Employee | null, status: number }> => {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'Employee/me')

  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store',
    headers: {
      Cookie: 'JwtToken=' + cookies().get('JwtToken')?.value
    },
    next: {
      tags: ['myemployee']
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
