import { type Project } from '@/interfaces/project'
import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'
import fetcher from '@/utility/fetcher'
import { IFilterProperties } from '@/interfaces/props/IFilter';

const getOngoingProjectsByClient = async (
  clientId: string,
  params: IFilterProperties
): Promise<{ data: DictionaryResponse<Project> | null; status: number }> => {
  const queryParams = new URLSearchParams(Object.entries(params)).toString()
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}Company/${clientId}/projects/ongoing?${queryParams}`

  const { data, status } = await fetcher<DictionaryResponse<Project>>(apiUrl, [
    'getOngoingProjectsByClient'
  ])

  return {
    data,
    status
  }
}

export default getOngoingProjectsByClient
