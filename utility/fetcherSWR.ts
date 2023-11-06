import { type SWRGetterReturn } from '@/interfaces/return/SWRGetterReturn'
import { clientRequestOptions } from '@/utility/clientCookieOptions'

export const fetcher = async <T>(url: string): Promise<SWRGetterReturn<T>> =>
  await fetch(url, clientRequestOptions).then(async (res) => await res.json())
