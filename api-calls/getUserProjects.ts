import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'
import { type Project } from '@/interfaces/project'
import { type IFilterProperties } from '@/interfaces/props/context props/IFilter'
import fetcher from '@/utility/fetcher'

// ? Uhmm maybe i should use isProject ** and isOwner but this is the users profile? Should I? Idk???
const getUserProjects = async (
  username: string,
  params: IFilterProperties
): Promise<{ data: DictionaryResponse<Project> | null, status: number }> => {
  const queryParams = new URLSearchParams(params as string).toString()
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}Employee/${username}/projects/all?${queryParams}`

  const { data, status } = await fetcher<DictionaryResponse<Project>>(apiUrl)

  return {
    data,
    status
  }
}

export default getUserProjects
