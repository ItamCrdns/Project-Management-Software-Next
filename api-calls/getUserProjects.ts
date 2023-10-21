import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'
import { type Project } from '@/interfaces/project'
import paginatedFetcher from '@/utility/paginatedFetcher'

const getUserProjects = async (
  username: string,
  page: string,
  pageSize: string
): Promise<{ data: DictionaryResponse<Project> | null, status: number }> =>
  await paginatedFetcher(`Employee/${username}/projects/all`, page, pageSize)

export default getUserProjects
