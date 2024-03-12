import { type SWRGetterReturn } from '@/interfaces/return/SWRGetterReturn'
import { type Company } from '@/interfaces/company'
import { fetcher } from '@/utility/fetcherSWR'
import useSWRImmutable from 'swr/immutable'

interface GetClientsReturn {
  clients: SWRGetterReturn<Company> | undefined
  isLoading: boolean
  isError: unknown
}

export const getClients = (page: number, pageSize: number, shouldFetch: boolean): GetClientsReturn => {
  const { data, error, isLoading } = useSWRImmutable<SWRGetterReturn<Company>>(
    shouldFetch ? `${process.env.NEXT_PUBLIC_API_URL}Company/all?page=${page}&pageSize=${pageSize}` : null,
    fetcher
  )

  return {
    clients: data,
    isLoading,
    isError: error
  }
}
