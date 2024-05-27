import getUserIssuesShowcase from '@/api-calls/getUserIssuesShowcase'
import Link from 'next/link'

const IssuesCard: React.FC<{ username: string }> = async (props) => {
  const { username } = props

  const { data } = await getUserIssuesShowcase(username, '1', '6')

  const issues = data?.data
  const issuesCount = data?.count

  return (
    <section className='flex items-center flex-col gap-4 shadow-md p-8 rounded-md bg-theming-white100 dark:bg-theming-dark300'>
      <h2 className='font-semibold self-start'>Issues</h2>
      {Array.isArray(issues) && issues.length > 0 ? (
        <>
          <ul className='px-4 grid grid-cols-2 gap-4'>
            {issues.map((issue) => (
              <li
                key={issue.issueId}
                className='p-2 bg-theming-white200 dark:bg-theming-dark200 rounded-md text-center'
              >
                <Link
                  className='text-sm px-4'
                  href={`/issues/${issue.issueId}`}
                >
                  {issue.name.slice(0, 24)}...
                </Link>
              </li>
            ))}
          </ul>
          <h3>
            <Link
              className='font-semibold text-sm'
              href={`/employee/${username}/issues?page=1`}
            >
              See all {issuesCount} issues
            </Link>
          </h3>
        </>
      ) : (
        <p>This employee has no assigned issues</p>
      )}
    </section>
  )
}

export default IssuesCard
