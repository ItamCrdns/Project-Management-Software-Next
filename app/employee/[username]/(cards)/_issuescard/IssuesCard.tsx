import getUserIssuesShowcase from '@/api-calls/getUserIssuesShowcase'
import { type Issue } from '@/interfaces/Issue'
import { Issue as IssueIcon } from '@/svg/Issue'
import Link from 'next/link'

const IssuesCard: React.FC<{ username: string }> = async (props) => {
  const { username } = props

  const { data } = await getUserIssuesShowcase(username, '1', '5')

  const issues = data?.data
  const issuesCount = data?.count

  return (
    <section className='flex items-center flex-col text-sm gap-4 shadow-md px-8 py-4 rounded-lg bg-theming-white100 dark:bg-theming-dark300'>
      <div className='flex items-center gap-4 justify-between border-b-2 border-azure-radiance-200 pb-4'>
        <IssueIcon />
        <h1 className='text-2xl m-0'>Current issues</h1>
        <h3 className='m-0'>List</h3>
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

export default IssuesCard
