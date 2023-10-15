import paginatedFetcher from '@/utility/paginatedFetcher'
import { type Employee } from '@/interfaces/employee'

const getProjectEmployees = async (
  projectId: string,
  page: string,
  pageSize: string
): Promise<{ data: Employee[] | null, status: number }> =>
  await paginatedFetcher(`Project/${projectId}/employees`, page, pageSize)

export default getProjectEmployees
