import paginatedFetcher from '@/utility/paginatedFetcher'
import { type Task } from '@/interfaces/task'
import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'

// * Admin only endpoint
const getTasksAdmin = async (
  page: string,
  pageSize: string
): Promise<{ data: DictionaryResponse<Task> | null, status: number }> =>
  await paginatedFetcher('Task/all', page, pageSize)

export default getTasksAdmin
