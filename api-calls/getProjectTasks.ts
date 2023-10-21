import paginatedFetcher from '@/utility/paginatedFetcher'
import { type Task } from '@/interfaces/task'
import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'

const getProjectTasks = async (
  projectId: string,
  page: string,
  pageSize: string
): Promise<{ data: DictionaryResponse<Task> | null, status: number }> =>
  await paginatedFetcher(`Project/${projectId}/tasks/all`, page, pageSize)

export default getProjectTasks
