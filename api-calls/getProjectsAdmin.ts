import { type Project } from '@/interfaces/project'
import { type SWRGetterReturn } from '@/interfaces/return/SWRGetterReturn'
import { fetcher } from '@/utility/fetcherSWR'
import useSWR from 'swr'

interface ProjectsReturn {
  projects: SWRGetterReturn<Project> | undefined
  isLoading: boolean
  isError: unknown
}

const useProjectsGetter = (page: string, pageSize: string): ProjectsReturn => {
  const { data, error, isLoading } = useSWR<SWRGetterReturn<Project>>(
    `${process.env.NEXT_PUBLIC_API_URL}Project/all?page=${page}&pageSize=${pageSize}`,
    fetcher
  )

  return {
    projects: data,
    isLoading,
    isError: error
  }
}

export default useProjectsGetter
