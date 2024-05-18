import { Info } from '@/svg/Info'
import { EntityNotFound } from '../EntityNotFound'
import { type IssueUIProps } from './IssueUI.interface'
import Link from 'next/link'
import { BadgeComponent } from '../ProjectUI/BadgeComponent'
import { dateUtil } from '@/utility/dateUtil'
import { Dates } from '../ProjectUI/Badges/Dates'
import { TeamAndCreator } from '../TeamAndCreator'

const IssueUI: React.FC<IssueUIProps> = (props) => {
  const { issue, showGeneralInfo, noIssue } = props

  if (noIssue) {
    return <EntityNotFound entity='Issue' />
  }

  return (
    <aside className='flex flex-col items-center gap-8'>
      <div className='flex flex-col gap-8 w-[400px]'>
        <div className='w-full space-y-2'>
          {showGeneralInfo === true && (
            <div className='flex items-center justify-center gap-2'>
              <h1 className='text-center font-semibold'>Issue report</h1>
              <Info />
            </div>
          )}
          <div className='flex flex-col items-center p-4 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
            <div className='flex gap-4 items-center'>
              <Link
                className='font-bold text-theming-dark100 dark:text-theming-white100'
                href={`/clients/${issue?.entity.task.clientId}/projects/${issue?.entity.task.projectId}/tasks/${issue?.entity.task.taskId}/issues/${issue?.entity.issueId}`}
              >
                {issue?.entity.name}
              </Link>
              {issue?.entity.startedWorking !== null &&
                issue?.entity.startedWorking !== undefined && (
                  <BadgeComponent
                    content={dateUtil(issue?.entity.startedWorking).text}
                    tooltip={new Date(
                      issue?.entity.startedWorking
                    ).toLocaleDateString('en-us', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      timeZone: 'UTC'
                    })}
                  />
                )}
            </div>
            <div className='p-0 -mt-2 w-full'>
              <Dates
                created={issue?.entity.created}
                expectedDelivery={issue?.entity.expectedDeliveryDate}
                finalized={issue?.entity.finished}
              />
            </div>
          </div>
        </div>
        <TeamAndCreator
          creator={issue?.entity.issueCreator}
          team={issue?.entity.employees}
          teamCount={issue?.entity.employeeCount}
          teamHref={''}
        />
      </div>
    </aside>
  )
}

export default IssueUI
