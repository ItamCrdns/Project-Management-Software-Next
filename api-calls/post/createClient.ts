import { type PostReturn } from '@/interfaces/return/PosterReturn'
import { postPatchCookieOptions } from '@/utility/cookieOptions'

export const handleCreateClient = async (
  clientName: string
): Promise<PostReturn<number>> => {
  const url = new URL(
    process.env.NEXT_PUBLIC_API_URL + 'CompanyManagement/create/nameonly'
  )

  const res = await fetch(
    url,
    postPatchCookieOptions(
      JSON.stringify({ name: clientName }),
      'application/json'
    )
  )

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
