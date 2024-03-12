import { type Company } from '@/interfaces/company'
import useSWRImmutable from 'swr/immutable'

const fetcher = async (url: string): Promise<Company> => {
  const res = await fetch(url, { credentials: 'include' })

  if (!res.ok) {
    const error = new Error(`${res.status}`)
    throw error
  }
  const data = await res.json()
  return data
}

export const getClientById = (id: number, shouldFetch: boolean): { client: Company | undefined, isLoading: boolean, isError: any } => {
  const url = shouldFetch ? `${process.env.NEXT_PUBLIC_API_URL}Company/${id}` : null

  const { data, error, isLoading } = useSWRImmutable<Company>(url, fetcher)

  return {
    client: data,
    isLoading,
    isError: error
  }
}
