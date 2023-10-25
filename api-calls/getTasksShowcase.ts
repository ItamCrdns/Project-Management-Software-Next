import paginatedFetcher from '@/utility/paginatedFetcher'
import { type Task } from '@/interfaces/task'
import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'

// Admin only endpoint
const getTasksShowcase = async (
  page: string,
  pageSize: string
): Promise<{ data: DictionaryResponse<Task> | null, status: number }> =>
  await paginatedFetcher('Task/all/showcase', page, pageSize)

export default getTasksShowcase
