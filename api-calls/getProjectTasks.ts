import paginatedFetcher from '@/utility/paginatedFetcher'
import { type Task } from '@/interfaces/task'

const getProjectTasks = async (
  projectId: string,
  page: string,
  pageSize: string
): Promise<{ data: Task[] | null, status: number }> =>
  await paginatedFetcher(`Task/project/${projectId}`, page, pageSize)

export default getProjectTasks
