import { type ApiResponse } from '@/interfaces/apiResponse'
import cookieOptions from './cookieOptions'

const serverFetcher = async <T>(endpoint: string): Promise<ApiResponse<T>> => {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + endpoint)

  const requestOptions = cookieOptions()

  const res = await fetch(url, requestOptions)

  if (!res.ok) {
    throw new Error(`An error has occured: ${res.status}`)
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

export default serverFetcher
