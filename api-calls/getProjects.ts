import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'
import { type Project } from '@/interfaces/project'
import { fetcherWithParams } from '@/utility/fetcher'

export interface GetProjectsProps {
  page: string
  pageSize: string
  projectsPage?: string
  projectsPageSize?: string
}
interface Response {
  companyName: string
  companyId: number
  isCurrentUserInTeam: boolean
  projects: Project[]
  count: number
  pages: number
  latestProjectCreation: string
}

export const getProjectsGroupedByCompany = async (
  props: GetProjectsProps
): Promise<DictionaryResponse<Response>> => {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'Project/all/groupedbycompany')

  Object.entries(props).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })

  return await fetcherWithParams(url)
}
