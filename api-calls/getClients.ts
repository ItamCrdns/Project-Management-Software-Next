import useSWR from 'swr'
import { type SWRGetterReturn } from '@/interfaces/return/SWRGetterReturn'
import { type Company } from '@/interfaces/company'
import { fetcher } from '@/utility/fetcherSWR'

interface GetClientsReturn {
  clients: SWRGetterReturn<Company> | undefined
  isLoading: boolean
  isError: unknown
}

const getClients = (page: string, pageSize: string, shouldFetch: boolean): GetClientsReturn => {
  const { data, error, isLoading } = useSWR<SWRGetterReturn<Company>>(
    shouldFetch ? `${process.env.NEXT_PUBLIC_API_URL}Company/all?page=${page}&pageSize=${pageSize}` : null,
    fetcher
  )

  return {
    clients: data,
    isLoading,
    isError: error
  }
}

export default getClients
