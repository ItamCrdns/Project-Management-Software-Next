import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'
import { type Issue } from '@/interfaces/Issue'
import { type IFilterProperties } from '@/interfaces/props/context props/IFilter'
import fetcher from '@/utility/fetcher'

interface TaskIssuesData {
  entity: DictionaryResponse<Issue>
  isTaskParticipant: boolean
  isTaskOwner: boolean
}

export const getTaskIssues = async (taskId: string, queryParams: IFilterProperties): Promise<{ data: TaskIssuesData | null, status: number }> => {
  const queryParamsString = new URLSearchParams(Object.entries(queryParams)).toString()
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}Task/${taskId}/issues/all?${queryParamsString}`

  const { data, status } = await fetcher<TaskIssuesData>(apiUrl)

  return {
    data,
    status
  }
}
