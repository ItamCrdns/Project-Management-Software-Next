import { type ApiResponse } from '@/interfaces/apiResponse'
import { clientRequestOptions } from './clientCookieOptions'

async function clientIdFetcher<T> (
  endpoint: string,
  id: string
): Promise<ApiResponse<T>> {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + endpoint + '/' + id)

  const res = await fetch(url, clientRequestOptions)

  if (!res.ok) {
    return {
      data: null,
      status: res.status
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

export default clientIdFetcher
