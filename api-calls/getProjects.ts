import paginatedFetcher from '@/utility/paginatedFetcher'
import { type Project } from '@/interfaces/project'

const getProjects = async (
  page: string,
  pageSize: string
): Promise<{ data: Project[] | null, status: number }> =>
  await paginatedFetcher('Project/all/groupedbycompany', page, pageSize)

export default getProjects
