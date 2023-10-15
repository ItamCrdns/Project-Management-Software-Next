import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'

const paginatedClientFetcher = async <T>(
  endpoint: string,
  page: string,
  pageSize: string
): Promise<{
  data: DictionaryResponse<T> | null
  status: number
}> => {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + endpoint)
  url.searchParams.set('page', page)
  url.searchParams.set('pageSize', pageSize)

  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include', // Cookies
    cache: 'no-store'
  }

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

export default paginatedClientFetcher
