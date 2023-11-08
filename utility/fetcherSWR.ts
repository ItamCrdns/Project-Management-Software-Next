import { type SWRGetterReturn } from '@/interfaces/return/SWRGetterReturn'
import { clientRequestOptions } from '@/utility/clientCookieOptions'

export const fetcher = async <T>(url: string): Promise<SWRGetterReturn<T>> => {
  const res = await fetch(url, clientRequestOptions)

  if (!res.ok) {
    throw new Error(`Something went wrong. Status code: ${res.status}`)
  }

  return await res.json() as SWRGetterReturn<T>
}
