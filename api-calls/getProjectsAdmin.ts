import { type Project } from '@/interfaces/project'
import { IFilterProperties } from '@/interfaces/props/IFilter'
import { type SWRGetterReturn } from '@/interfaces/return/SWRGetterReturn'
import { fetcher } from '@/utility/fetcherSWR'
import useSWR from 'swr'

interface ProjectsReturn {
  projects: SWRGetterReturn<Project> | undefined
  isLoading: boolean
  isError: unknown
}

const useProjectsGetter = (params?: IFilterProperties): ProjectsReturn => {
  const queryParams = new URLSearchParams(params as string).toString()
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}Project/all?${queryParams}`

  const { data, error, isLoading } = useSWR<SWRGetterReturn<Project>>(
    apiUrl,
    fetcher
  )

  return {
    projects: data,
    isLoading,
    isError: error
  }
}

export default useProjectsGetter
