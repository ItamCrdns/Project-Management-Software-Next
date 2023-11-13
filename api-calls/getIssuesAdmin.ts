import { type Issue } from '@/interfaces/Issue'
import { type IFilterProperties } from '@/interfaces/props/context props/IFilter'
import { type SWRGetterReturn } from '@/interfaces/return/SWRGetterReturn'
import { fetcher } from '@/utility/fetcherSWR'
import useSWR from 'swr'

interface IssuesReturn {
  issues: SWRGetterReturn<Issue> | undefined
  isLoading: boolean
  isError: unknown
}

const useIssuesGetter = (params?: IFilterProperties): IssuesReturn => {
  const queryParams = new URLSearchParams(params as string).toString()
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}Issue/all?${queryParams}`
  const { data, error, isLoading } = useSWR<SWRGetterReturn<Issue>>(
    apiUrl,
    fetcher
  )

  return {
    issues: data,
    isLoading,
    isError: error
  }
}

export default useIssuesGetter
