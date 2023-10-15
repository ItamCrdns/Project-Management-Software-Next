import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'
import { type Employee } from '@/interfaces/employee'
import paginatedClientFetcher from '@/utility/paginatedClientFetcher'

const getCompanyEmployees = async (
  endpoint: string,
  page: string,
  pageSize: string
): Promise<{
  data: DictionaryResponse<Employee> | null
  status: number
}> => await paginatedClientFetcher(endpoint, page, pageSize)

export default getCompanyEmployees
