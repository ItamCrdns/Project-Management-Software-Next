import styles from '@/app/projects/(individual)/[projectId]/project.module.css'
import getUserIssuesShowcase from '@/api-calls/getUserIssuesShowcase'
import Link from 'next/link'
import { type Issue } from '@/interfaces/Issue'

interface CurrentIssuesProps {
  params: { username: string }
}

const CurrentIssues: React.FunctionComponent<CurrentIssuesProps> = async ({
  params
}) => {
  const { username } = params
  const { data } = await getUserIssuesShowcase(username, '1', '5')
  const issues = data?.data
  const issuesCount = data?.count

  return (
    <section className={styles.employees}>
      <div className={styles.headerwrapper}>
        <div>
          <span className="material-symbols-outlined">campaign</span>
          <h1>Current issues</h1>
        </div>
        <h3>List</h3>
      </div>
      {Array.isArray(issues) && issues.length > 0
        ? (
        <>
          <ul>
            {issues.map((issue: Issue) => (
              <li key={issue.issueId}>
                <Link href={`/issues/${issue.issueId}`}>
                  <p style={{ margin: 0 }}>{issue.name}</p>
                </Link>
              </li>
            ))}
          </ul>
          <h3>
            <Link href={`/employees/${username}/issues?page=1`}>
              See all {issuesCount} issues
            </Link>
          </h3>
        </>
          )
        : (
        <p>Here we will show their current issues.</p>
          )}
    </section>
  )
}

export default CurrentIssues
