import { type Issue } from '@/interfaces/Issue'
import { type SWRGetterReturn } from '@/interfaces/return/SWRGetterReturn'
import { fetcher } from '@/utility/fetcherSWR'
import useSWR from 'swr'

interface IssuesReturn {
  issues: SWRGetterReturn<Issue> | undefined
  isLoading: boolean
  isError: unknown
}

const useIssuesGetter = (page: string, pageSize: string): IssuesReturn => {
  const { data, error, isLoading } = useSWR<SWRGetterReturn<Issue>>(
    `${process.env.NEXT_PUBLIC_API_URL}Issue/all?page=${page}&pageSize=${pageSize}`,
    fetcher
  )

  return {
    issues: data,
    isLoading,
    isError: error
  }
}

export default useIssuesGetter
