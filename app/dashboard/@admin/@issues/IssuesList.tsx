import { type Issue } from '@/interfaces/Issue'
import { type SWRGetterReturn } from '@/interfaces/return/SWRGetterReturn'
import EntityHeader from '../EntityHeader'
import EachIssue from '@/app/issues/EachIssue'
import {
  type IFilterProperties,
  type IFilter
} from '@/interfaces/props/context props/IFilter'
import { issueSortValues } from './sortValues'
import DataHeader from '@/components/Data Header/DataHeader'
import LoadingSkeleton from '../@projects/LoadingSkeleton'

interface IssuesProps {
  isLoading: boolean
  isError: unknown
  issues: SWRGetterReturn<Issue> | undefined
  updateFilter: (key: keyof IFilter, props: IFilterProperties) => void
  skeletonCount: number
}

const IssuesList: React.FC<IssuesProps> = (props) => {
  const { isLoading, isError, issues } = props

  return (
    <section className='space-y-4 mb-8'>
      <EntityHeader name='issues' />
      <div>
        <DataHeader
          dashboard
          pushSearchParams={false}
          entity='issues'
          width='200px'
          updateFilter={props.updateFilter}
          sortValues={issueSortValues}
        />
        {isLoading && <LoadingSkeleton skeletonCount={props.skeletonCount} />}
        {isError !== undefined && <p>{isError?.toString()}</p>}
        {Array.isArray(issues?.data) && (
          <ul className='space-y-4 items-stretch'>
            {issues?.data.map((issue: Issue, index: number) => (
              <li className='relative flex items-center justify-center flex-row rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300' key={index}>
                <EachIssue issue={issue} showTaskName />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default IssuesList
