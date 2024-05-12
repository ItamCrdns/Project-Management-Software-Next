import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'
import { ApiResponse } from '@/interfaces/apiResponse'
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
): Promise<ApiResponse<DictionaryResponse<Response> | null>> => {
  const url = new URL(
    process.env.NEXT_PUBLIC_API_URL + 'Project/all/groupedbycompany'
  )

  Object.entries(props).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })
  const { data, status } =
    await fetcherWithParams<DictionaryResponse<Response>>(url)

  return {
    data,
    status
  }
}
