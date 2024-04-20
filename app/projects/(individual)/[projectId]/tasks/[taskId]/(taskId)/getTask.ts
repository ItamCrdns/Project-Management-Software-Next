import { type ApiResponse } from '@/interfaces/apiResponse'
import { type Task } from '@/interfaces/task'
import { type Data } from '@/utility/api/DataParticipantOwner.interface'
import fetcher from '@/utility/fetcher'

export const getTask = async (projectId: string, taskId: string): Promise<ApiResponse<Data<Task>>> => {
  const url = process.env.NEXT_PUBLIC_API_URL + 'Project/' + projectId + '/tasks/' + taskId

  return await fetcher(url)
}
