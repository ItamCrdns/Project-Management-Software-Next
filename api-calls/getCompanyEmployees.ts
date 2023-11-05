import { type Employee } from '@/interfaces/employee'
import { type ClientReturn } from '@/interfaces/return/ClientReturn'
import paginatedClientFetcher from '@/utility/paginatedClientFetcher'

const getCompanyEmployees = async (
  endpoint: string,
  page: string,
  pageSize: string
): Promise<ClientReturn<Employee>> =>
  await paginatedClientFetcher(endpoint, page, pageSize)

export default getCompanyEmployees
