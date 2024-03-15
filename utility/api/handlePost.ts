import { type PostReturn } from '@/interfaces/return/PosterReturn'
import { postCookieOptions } from '../cookieOptions'

export const handlePost = async <T>(endpoint: string, fd: FormData): Promise<PostReturn<T>> => {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + endpoint)

  const res = await fetch(url, postCookieOptions(fd))

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
