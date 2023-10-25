import paginatedFetcher from '@/utility/paginatedFetcher'
import { type Project } from '@/interfaces/project'
import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'

// Admin only endpoint
const getProjectsShowcase = async (
  page: string,
  pageSize: string
): Promise<{ data: DictionaryResponse<Project> | null, status: number }> =>
  await paginatedFetcher('Project/all/showcase', page, pageSize)

export default getProjectsShowcase
