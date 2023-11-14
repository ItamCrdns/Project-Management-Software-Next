import { type IFilterProperties } from '@/interfaces/props/context props/IFilter'
import { type SWRGetterReturn } from '@/interfaces/return/SWRGetterReturn'
import { type Task } from '@/interfaces/task'
import { fetcher } from '@/utility/fetcherSWR'
import useSWR from 'swr'

interface TasksReturn {
  tasks: SWRGetterReturn<Task> | undefined
  isLoading: boolean
  isError: unknown
}

const useTasksGetter = (params?: IFilterProperties): TasksReturn => {
  const queryParams = new URLSearchParams(params as string).toString()
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}Task/all?${queryParams}`

  const { data, error, isLoading } = useSWR<SWRGetterReturn<Task>>(
    apiUrl,
    fetcher
  )

  return {
    tasks: data,
    isLoading,
    isError: error
  }
}

export default useTasksGetter
