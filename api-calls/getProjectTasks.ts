import { type Task } from '@/interfaces/task'
import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'
import { type IFilterProperties } from '@/interfaces/props/context props/IFilter'
import fetcher from '@/utility/fetcher'

export interface Data {
  entity: DictionaryResponse<Task>
  isProjectParticipant: boolean
  isProjectOwner: boolean
}

const getProjectTasks = async (
  projectId: string,
  params: IFilterProperties
): Promise<{ data: Data | null; status: number }> => {
  const queryParams = new URLSearchParams(Object.entries(params)).toString()
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}Project/${projectId}/tasks/all?${queryParams}`

  const { data, status } = await fetcher<Data>(apiUrl, ['getProjectTasks'])

  return {
    data,
    status
  }
}

export default getProjectTasks
