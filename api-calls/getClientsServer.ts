import { DataCountPages } from '@/interfaces/DataCountPages.interface'
import { CompanyAndCounts } from '@/interfaces/companyAndCounts'
import fetcher from '@/utility/fetcher'

export const getClientsServer = async () =>
  fetcher<DataCountPages<CompanyAndCounts>>(
    process.env.NEXT_PUBLIC_API_URL + 'Company/all',
    ['getClientsServer']
  )
