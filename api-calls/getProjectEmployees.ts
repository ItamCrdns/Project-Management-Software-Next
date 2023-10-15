import paginatedClientFetcher from '@/utility/paginatedClientFetcher'
import { type Employee } from '@/interfaces/employee'
import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'

const getProjectEmployees = async (
  endpoint: string,
  page: string,
  pageSize: string
): Promise<{ data: DictionaryResponse<Employee> | null, status: number }> =>
  await paginatedClientFetcher(endpoint, page, pageSize)

export default getProjectEmployees
