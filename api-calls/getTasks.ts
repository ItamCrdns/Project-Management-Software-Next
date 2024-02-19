import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'
import { type ApiResponse } from '@/interfaces/apiResponse'
import { type Task } from '@/interfaces/task'
import cookieOptions from '@/utility/cookieOptions'

// Returns tasks, grouped by project
export interface GetTasksProps {
  page: string
  pageSize: string
  tasksPage?: string
  tasksPageSize?: string
}

interface Response {
  projectName: string
  projectId: number
  tasks: Task[]
  count: number
  pages: number
  latestTaskCreation: string
}

const getTasks = async (
  props: GetTasksProps
): Promise<ApiResponse<DictionaryResponse<Response>>> => {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'Task/grouped')

  Object.entries(props).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })

  const requestOptions = cookieOptions()

  const tasks = await fetch(url, requestOptions)

  if (tasks.ok) {
    return {
      data: await tasks.json(),
      status: tasks.status
    }
  }

  return {
    data: null,
    status: tasks.status
  }
}

export default getTasks
