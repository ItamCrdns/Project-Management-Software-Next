import { type ApiResponse } from '@/interfaces/apiResponse'
import cookieOptions from './cookieOptions'

/**
 * Fetches data from an API endpoint with a given ID and returns the response as an ApiResponse object.
 * @param endpoint - The API endpoint to fetch data from.
 * @param id - The ID of the data to fetch.
 * @returns An ApiResponse object containing the fetched data and the HTTP status code of the response.
 */

async function idFetcher<T> (
  endpoint: string,
  id: string
): Promise<ApiResponse<T>> {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + endpoint + '/' + id)

  const requestOptions = cookieOptions()

  const res = await fetch(url, requestOptions)

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

export default idFetcher
