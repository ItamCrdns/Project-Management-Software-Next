import { type Project } from '@/interfaces/project'
import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'
import { type IFilterProperties } from '@/interfaces/props/context props/IFilter'
import fetcher from '@/utility/fetcher'

const getCompanyProjects = async (
  clientId: string,
  params: IFilterProperties
): Promise<{ data: DictionaryResponse<Project> | null, status: number }> => {
  const queryParams = new URLSearchParams(params as string).toString()
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}Project/company/${clientId}?${queryParams}`

  const { data, status } = await fetcher<DictionaryResponse<Project>>(apiUrl)

  return {
    data,
    status
  }
}

export default getCompanyProjects
