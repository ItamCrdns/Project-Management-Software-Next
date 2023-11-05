import paginatedClientFetcher from '@/utility/paginatedClientFetcher'
import { type ClientReturn } from '@/interfaces/return/ClientReturn'
import { type Company } from '@/interfaces/company'

const getClients = async (
  page: string,
  pageSize: string
): Promise<ClientReturn<Company>> =>
  await paginatedClientFetcher('Company/all', page, pageSize)

export default getClients
