import { DictionaryResponse } from '@/interfaces/DictionaryResponse'
import { Project } from '@/interfaces/project'
import { IFilterProperties } from '@/interfaces/props/IFilter'
import fetcher from '@/utility/fetcher'

const getNotStartedProjectsByClient = async (
  clientId: string,
  params: IFilterProperties
): Promise<{
  data: DictionaryResponse<Project> | null
  status: number
}> => {
  const queryParams = new URLSearchParams(Object.entries(params)).toString()
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}Company/${clientId}/projects/not-started?${queryParams}`

  const { data, status } = await fetcher<DictionaryResponse<Project>>(apiUrl, [
    'getNotStartedProjectsByClient'
  ])

  return {
    data,
    status
  }
}

export default getNotStartedProjectsByClient
