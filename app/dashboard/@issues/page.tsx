import getIssuesShowcase from '@/api-calls/getIssuesShowcase'
import { type Issue } from '@/interfaces/Issue'
import styles from '../banner.module.css'
import Link from 'next/link'

const Issues: React.FunctionComponent = async () => {
  const { data } = await getIssuesShowcase('1', '5')
  const issues = data?.data

  return (
    <article className={styles.banner}>
      <div className={styles.header}>
        <span className="material-symbols-outlined">campaign</span>
        <h1>Tasks</h1>
      </div>
      {Array.isArray(issues) && (
        <ul>
          {issues.map((issue: Issue) => (
            <li key={issue.issueId}>
              <h2>
                <Link href={`/issues/${issue.issueId}`}>{issue.name}</Link>
              </h2>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default Issues
