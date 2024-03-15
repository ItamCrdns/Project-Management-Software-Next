import { type PostReturn } from '@/interfaces/return/PosterReturn'
import { postCookieOptions } from '@/utility/cookieOptions'

export const handleCreateClient = async (
  clientName: string
): Promise<PostReturn<number>> => {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'Company/new/nameonly')

  const res = await fetch(url, postCookieOptions(JSON.stringify({ name: clientName }), 'application/json'))

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
