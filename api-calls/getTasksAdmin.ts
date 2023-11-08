import { type SWRGetterReturn } from '@/interfaces/return/SWRGetterReturn'
import { type Task } from '@/interfaces/task'
import { fetcher } from '@/utility/fetcherSWR'
import useSWR from 'swr'

interface TasksReturn {
  tasks: SWRGetterReturn<Task> | undefined
  isLoading: boolean
  isError: unknown
}

const useTasksGetter = (page: string, pageSize: string): TasksReturn => {
  const { data, error, isLoading } = useSWR<SWRGetterReturn<Task>>(
    `${process.env.NEXT_PUBLIC_API_URL}Task/all?page=${page}&pageSize=${pageSize}`,
    fetcher
  )

  return {
    tasks: data,
    isLoading,
    isError: error
  }
}

export default useTasksGetter
