import styles from '@/app/projects/(list)/projectslist.module.css'
import dashboardstyles from '@/app/dashboard/dashboard.module.css'
import { type Issue } from '@/interfaces/Issue'
import { type SWRGetterReturn } from '@/interfaces/return/SWRGetterReturn'
import EntityHeader from '../EntityHeader'
import HeaderDescriptor from '@/app/projects/(list)/HeaderDescriptor'
import EachIssue from '@/app/issues/EachIssue'
import LoadingFetch from '../_fetch loader/LoadingFetch'
import {
  type IFilterProperties,
  type IFilter
} from '@/interfaces/props/context props/IFilter'
import { issueSortValues } from './sortValues'

interface IssuesProps {
  isLoading: boolean
  isError: unknown
  issues: SWRGetterReturn<Issue> | undefined
  updateFilter: (key: keyof IFilter, props: IFilterProperties) => void
}

const IssuesList: React.FC<IssuesProps> = (props) => {
  const { isLoading, isError, issues } = props

  return (
    <section>
      <EntityHeader color="#FF6969" entityName="issues" />
      <div className={`${styles.projectswrapper} ${dashboardstyles.menu}`}>
        <HeaderDescriptor
          dashboard
          pushSearchParams={false}
          entity="issues"
          width="200px"
          updateFilter={props.updateFilter}
          sortValues={issueSortValues}
        />
        {isLoading && <LoadingFetch entityName="issues" />}
        {isError !== undefined && <p>{isError?.toString()}</p>}
        {Array.isArray(issues?.data) && (
          <ul>
            {issues?.data.map((issue: Issue, index: number) => (
              <li key={index}>
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
