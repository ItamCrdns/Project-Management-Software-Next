import { type ApiResponse } from '@/interfaces/apiResponse'
import cookieOptions from './cookieOptions'

/**
 * Fetches paginated data from an API endpoint.
 * Fetching data with different interfaces
 * @param endpoint - The API endpoint to fetch data from.
 * @param page - The page number to fetch.
 * @param pageSize - The number of items to fetch per page.
 * @returns A Promise that resolves to an ApiResponse object containing the fetched data and status code.
 */

async function paginatedFetcher<T>(
  endpoint: string,
  page: string,
  pageSize: string,
  nextTags?: string[]
): Promise<ApiResponse<T>> {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + endpoint)

  if (page !== undefined && page !== '') {
    url.searchParams.set('page', page)
  }

  if (pageSize !== undefined && pageSize !== '') {
    url.searchParams.set('pageSize', pageSize)
  }

  const requestOptions = cookieOptions(nextTags)

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
