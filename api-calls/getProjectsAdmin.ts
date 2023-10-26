import paginatedFetcher from '@/utility/paginatedFetcher'
import { type Project } from '@/interfaces/project'
import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'

// * Admin only endpoint
const getProjectsAdmin = async (
  page: string,
  pageSize: string
): Promise<{ data: DictionaryResponse<Project> | null, status: number }> =>
  await paginatedFetcher('Project/all', page, pageSize)

export default getProjectsAdmin
