import { getTaskIssues } from '@/api-calls/getTaskIssues'
import EachIssue from '@/app/issues/EachIssue'
import { NotFound } from '@/components/404 Not Found/NotFound'
import { Button } from '@/components/Button/Button'
import { ArrowRightCircle } from '@/icons/ArrowRightCircle'

const IssuesParallel: React.FC<{
  params: { clientId: string; projectId: string; taskId: string }
}> = async (props) => {
  const { clientId, taskId, projectId } = props.params

  const { data } = await getTaskIssues(taskId, {
    page: '1',
    pageSize: '5',
    orderBy: 'Created',
    sort: 'descending'
  })

  const noIssues = data?.entity.count === 0
  const isTaskCreator = data?.isTaskOwner ?? false

  if (noIssues) {
    if (isTaskCreator) {
      return (
        <NotFound
          text='No issues found'
          buttonText='Create an issue'
          href={`/clients/${clientId}/projects/${projectId}/tasks/${taskId}/issues/create`}
        />
      )
    } else {
      return <NotFound text='No issues found' />
    }
  }

  const issues = data?.entity.data

  if (Array.isArray(issues) && issues.length > 0) {
    return (
      <div className='space-y-4 flex flex-col'>
        <ul className='space-y-4 items-stretch'>
          {issues.map((issue) => (
            <li
              key={issue.issueId}
              className='relative flex items-center justify-center flex-row rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'
            >
              <EachIssue
                issue={issue}
                showTaskName={false}
                entityBasePath={`clients/${clientId}/projects/${issue.task.projectId}/tasks/${issue.task.taskId}/issues`}
              />
            </li>
          ))}
        </ul>
        <p className='text-right text-xs'>
          Total {data?.entity.data?.[0]?.task?.name} issues:{' '}
          {data?.entity.count}
        </p>
        <div className='flex self-end'>
          <Button
            text='All issues'
            href={`/clients/${clientId}/projects/${projectId}/tasks/${taskId}/issues`}
            icon={<ArrowRightCircle />}
          />
        </div>
      </div>
    )
  }
}

export default IssuesParallel
