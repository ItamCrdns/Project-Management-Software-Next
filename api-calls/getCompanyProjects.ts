import paginatedFetcher from '@/utility/paginatedFetcher'
import { type Project } from '@/interfaces/project'
import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'

const getCompanyProjects = async (
  companyId: string,
  page: string,
  pageSize: string
): Promise<{ data: DictionaryResponse<Project> | null, status: number }> =>
  await paginatedFetcher('Project/company/' + companyId, page, pageSize)

export default getCompanyProjects
