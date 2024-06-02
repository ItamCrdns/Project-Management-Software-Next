import Link from 'next/link'
import { Dates } from '../ProjectUI/Badges/Dates'
import { Issue } from '@/interfaces/Issue'
import { BadgeComponent } from '../ProjectUI/BadgeComponent'
import { dateUtil } from '@/utility/dateUtil'

const IssueUI = ({
  issue
}: {
  issue: Issue
}) => {
  return (
    <div className='flex flex-col items-center p-8 gap-2 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
      <h1 className='self-start font-semibold'>Issue report</h1>
      <div className='flex gap-4 items-center'>
        <Link
          className='font-bold text-theming-dark100 dark:text-theming-white100'
          href={`/clients/${issue.task.clientId}/projects/${issue.task.projectId}/tasks/${issue.task.taskId}/issues/${issue.issueId}`}
        >
          {issue.name}
        </Link>
        {issue.startedWorking !== null ? (
          <BadgeComponent
            content={`Started ${dateUtil(issue.startedWorking).text}`}
            tooltip={new Date(issue.startedWorking).toLocaleDateString(
              'en-us',
              {
                weekday: 'long',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'UTC'
              }
            )}
          />
        ) : (
          <BadgeComponent
            content='Not started'
            color='gray'
            tooltip='No one is working on this issue yet'
          />
        )}
      </div>
      <div className='p-0 -mt-2 w-full'>
        <Dates
          created={issue.created}
          expectedDelivery={issue.expectedDeliveryDate}
          finalized={issue.finished}
        />
      </div>
    </div>
  )
}

export default IssueUI
