import styles from '@/app/projects/(list)/projectslist.module.css'
import dashboardstyles from '@/app/dashboard/dashboard.module.css'
import { type Issue } from '@/interfaces/Issue'
import { type SWRGetterReturn } from '@/interfaces/return/SWRGetterReturn'
import EntityHeader from '../EntityHeader'
import HeaderDescriptor from '@/app/projects/(list)/HeaderDescriptor'
import EachIssue from '@/app/issues/EachIssue'
import LoadingFetch from '../_fetch loader/LoadingFetch'

interface IssuesProps {
  isLoading: boolean
  isError: unknown
  issues: SWRGetterReturn<Issue> | undefined
}

const IssuesList: React.FC<IssuesProps> = (props) => {
  const { isLoading, isError, issues } = props

  return (
    <article>
      <EntityHeader color="#FF6969" entityName="issues" />
      <section className={`${styles.projectswrapper} ${dashboardstyles.menu}`}>
        <HeaderDescriptor dashboard isIssue width="200px" />
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
      </section>
    </article>
  )
}

export default IssuesList
