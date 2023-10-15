import paginatedClientFetcher from '@/utility/paginatedClientFetcher'
import { type Employee } from '@/interfaces/employee'
import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'

const getProjectEmployees = async (
  projectId: string,
  page: string,
  pageSize: string
): Promise<{ data: DictionaryResponse<Employee> | null, status: number }> =>
  await paginatedClientFetcher(`Project/${projectId}/employees`, page, pageSize)

export default getProjectEmployees
