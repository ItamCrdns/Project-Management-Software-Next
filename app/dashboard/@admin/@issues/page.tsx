import getIssuesAdmin from '@/api-calls/getIssuesAdmin'
import styles from '@/app/projects/(list)/projectslist.module.css'
import dashboardstyles from '@/app/dashboard/dashboard.module.css'
import Footer from '../../Footer'
import HeaderDescriptor from '@/app/projects/(list)/HeaderDescriptor'
import EachIssue from '@/app/issues/EachIssue'
import { type Issue } from '@/interfaces/Issue'

const Issues: React.FunctionComponent = async () => {
  const { data } = await getIssuesAdmin('1', '5')
  const issues = data?.data ?? []
  const totalIssuesCount = data?.count ?? 0

  return (
    <article>
      <h1 style={{ fontSize: '32px', fontWeight: 600, color: '#FF6969', textAlign: 'center' }}>LATEST ISSUES</h1>
      <section className={`${styles.projectswrapper} ${dashboardstyles.menu}`}>
        <HeaderDescriptor dashboard isIssue />
        {Array.isArray(issues) && (
          <>
            <ul>
              {issues.map((issue: Issue, index: number) => (
                <li key={index}>
                  <EachIssue issue={issue} showTaskName />
                </li>
              ))}
            </ul>
            <Footer
              showingCount={issues.length}
              totalCount={totalIssuesCount}
              href="/issues"
            />
          </>
        )}
      </section>
    </article>
  )
}

export default Issues
