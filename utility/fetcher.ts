import { type ApiResponse } from '@/interfaces/apiResponse'
import cookieOptions from './cookieOptions'

const fetcher = async <T>(
  apiUrl: string,
  nextTags?: string[]
): Promise<ApiResponse<T>> => {
  const url = new URL(apiUrl) // ? Need to pass this url already with any necessary query params

  const requestOptions = cookieOptions(nextTags)

  const res = await fetch(url, requestOptions)

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

export default fetcher

export const fetcherWithParams = async <T>(
  url: URL
): Promise<ApiResponse<T>> => {
  const requestOptions = cookieOptions()

  const res = await fetch(url.toString(), requestOptions)

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
