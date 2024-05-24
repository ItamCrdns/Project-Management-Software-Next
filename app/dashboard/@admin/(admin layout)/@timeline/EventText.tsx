import Link from 'next/link'
import { Timeline } from './Timeline.interface'

const EventText = ({
  event
}: {
  event: Timeline
}) => {
  return (
    <p>
      <Link
        href={`/employee/${event.employee.username}`}
        className='font-semibold'
      >
        {event.employee.username}
      </Link>{' '}
      {event.event}{' '}
      {event.project && (
        <Link
          href={`/clients/${event.project.clientId}/projects/${event.project.projectId}`}
          className='text-azure-radiance-500'
        >
          #{event.project.projectId}
        </Link>
      )}
      {event.task && (
        <Link
          href={`/clients/${event.task.clientId}/projects/${event.task.projectId}/tasks/${event.task.taskId}`}
          className='text-azure-radiance-500'
        >
          #{event.task.taskId}
        </Link>
      )}
      {event.issue && (
        <Link
          href={`/clients/${event.issue.clientId}/projects/${event.issue.projectId}/tasks/${event.issue.taskId}/issues/${event.issue.issueId}`}
          className='text-azure-radiance-500'
        >
          #{event.issue.issueId}
        </Link>
      )}
    </p>
  )
}

export { EventText }
