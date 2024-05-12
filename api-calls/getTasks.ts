import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'
import { ApiResponse } from '@/interfaces/apiResponse'
import { type Task } from '@/interfaces/task'
import { fetcherWithParams } from '@/utility/fetcher'

export interface GetTasksProps {
  page: string
  pageSize: string
  tasksPage?: string
  tasksPageSize?: string
}

interface Response {
  projectName: string
  projectId: number
  isCurrentUserOwner: boolean
  isCurrentUserInTeam: boolean
  tasks: Task[]
  count: number
  pages: number
  latestTaskCreation: string
}

const getTasks = async (
  props: GetTasksProps
): Promise<ApiResponse<DictionaryResponse<Response> | null>> => {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'Task/grouped')

  Object.entries(props).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })

  const { data, status } =
    await fetcherWithParams<DictionaryResponse<Response>>(url)

  return {
    data,
    status
  }
}

export default getTasks
