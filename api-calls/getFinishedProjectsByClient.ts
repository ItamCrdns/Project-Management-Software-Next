import { type Project } from '@/interfaces/project'
import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'
import { type IFilterProperties } from '@/interfaces/props/context props/IFilter'
import fetcher from '@/utility/fetcher'

const getFinishedProjectsByClient = async (
  clientId: string,
  params: IFilterProperties
): Promise<{ data: DictionaryResponse<Project> | null; status: number }> => {
  const queryParams = new URLSearchParams(Object.entries(params)).toString()
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}Company/${clientId}/projects/finished?${queryParams}`

  const { data, status } = await fetcher<DictionaryResponse<Project>>(apiUrl, [
    'getFinishedProjectsByClient'
  ])

  return {
    data,
    status
  }
}

export default getFinishedProjectsByClient