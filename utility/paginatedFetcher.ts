import { type ApiResponse } from '@/interfaces/apiResponse'
import { cookies } from 'next/headers'

/**
 * Fetches paginated data from an API endpoint.
 * Fetching data with different interfaces
 * @param endpoint - The API endpoint to fetch data from.
 * @param page - The page number to fetch.
 * @param pageSize - The number of items to fetch per page.
 * @returns A Promise that resolves to an ApiResponse object containing the fetched data and status code.
 */

async function paginatedFetcher<T> (
  endpoint: string,
  page: string,
  pageSize: string
): Promise<ApiResponse<T>> {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + endpoint)
  url.searchParams.set('page', page)
  url.searchParams.set('pageSize', pageSize)

  const cookieStore = cookies()
  const jwtCookie = cookieStore.get('JwtToken')

  const headers = new Headers({
    Cookie: 'JwtToken=' + jwtCookie?.value
  })

  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store',
    headers
  }

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

export default paginatedFetcher
