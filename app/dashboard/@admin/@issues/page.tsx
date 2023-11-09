import getIssuesAdmin from '@/api-calls/getIssuesAdmin'
import styles from '@/app/projects/(list)/projectslist.module.css'
import dashboardstyles from '@/app/dashboard/dashboard.module.css'
import HeaderDescriptor from '@/app/projects/(list)/HeaderDescriptor'
import EachIssue from '@/app/issues/EachIssue'
import { type Issue } from '@/interfaces/Issue'
import EntityHeader from '../EntityHeader'

const Issues: React.FunctionComponent = async () => {
  const { data } = await getIssuesAdmin('1', '5')
  const issues = data?.data ?? []

  return (
    <article>
      <EntityHeader color='#FF6969' entityName='issues'/>
      <section className={`${styles.projectswrapper} ${dashboardstyles.menu}`}>
        <HeaderDescriptor dashboard isIssue width='200px' />
        {Array.isArray(issues) && (
          <>
            <ul>
              {issues.map((issue: Issue, index: number) => (
                <li key={index}>
                  <EachIssue issue={issue} showTaskName />
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </article>
  )
}

export default Issues
