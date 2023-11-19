import paginatedFetcher from '@/utility/paginatedFetcher'
import { type Task } from '@/interfaces/task'
import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'

interface Data {
  entity: DictionaryResponse<Task>
  isProjectParticipant: boolean
  isProjectOwner: boolean
}

const getProjectTasks = async (
  projectId: string,
  page: string,
  pageSize: string
): Promise<{ data: Data | null, status: number }> =>
  await paginatedFetcher(`Project/${projectId}/tasks/all`, page, pageSize)

export default getProjectTasks
