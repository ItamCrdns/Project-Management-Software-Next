import paginatedFetcher from '@/utility/paginatedFetcher'
import { type Project } from '@/interfaces/project'

const getCompanyProjects = async (
  companyId: string,
  page: string,
  pageSize: string
): Promise<{ data: Project[] | null, status: number }> =>
  await paginatedFetcher('Project/company/' + companyId, page, pageSize)

export default getCompanyProjects
