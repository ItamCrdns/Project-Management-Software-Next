import { type Task } from '@/interfaces/task'
import paginatedFetcher from '@/utility/paginatedFetcher'
import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'

const getUserTasksShowcase = async (
  username: string,
  page: string,
  pageSize: string
): Promise<{ data: DictionaryResponse<Task> | null, status: number }> =>
  await paginatedFetcher(`Employee/${username}/tasks/showcase`, page, pageSize)

export default getUserTasksShowcase
