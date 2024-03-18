import { postCookieOptions } from '../cookieOptions'
import { type ApiResponse } from '@/interfaces/apiResponse'

export const handlePost = async <T>(endpoint: string, fd: FormData): Promise<ApiResponse<T>> => {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + endpoint)

  const res = await fetch(url, postCookieOptions(fd))

  if (!res.ok) {
    return {
      data: null,
      status: res.status,
      error: await res.json()
    }
  }

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
