'use client'
import { useSignalR } from '@/hooks/useSignalR'
import { Timeline } from './Timeline.interface'
import { DictionaryResponse } from '@/interfaces/DictionaryResponse'
import { dateUtil } from '@/utility/dateUtil'
import Image from 'next/image'
import Link from 'next/link'

interface TimelineBannerProps {
  prevEvents: DictionaryResponse<Timeline> | null
}

const TimelineBanner: React.FC<TimelineBannerProps> = (props) => {
  const { prevEvents } = props

  const newTimelineData = useSignalR(
    'ReceiveTimelineEvent',
    prevEvents ?? { data: [], count: 0, pages: 0 }
  )

  return (
    <div className='p-8 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
      <h1 className='font-semibold mb-4'>Activity Timeline</h1>
      <ul className=''>
        {newTimelineData.count > 0 ? (
          newTimelineData?.data?.map((event) => (
            <li
              className='space-y-2 flex items-center gap-4 relative h-[100px]'
              key={event.timelineId}
            >
              <div className='flex items-center justify-center'>
                <div
                  className={`${(() => {
                    switch (event.type) {
                      case 'Login':
                        return 'bg-blue-400'
                      case 'Logout':
                        return 'bg-red-400'
                      case 'Update':
                        return 'bg-blue-400'
                      case 'Delete':
                        return 'bg-red-400'
                      case 'Create':
                        return 'bg-green-400'
                      case 'Register':
                        return 'bg-green-400'
                      case 'Assign':
                        return 'bg-green-400'
                      case 'Unassign':
                        return 'bg-red-400'
                      case 'Start':
                        return 'bg-green-400'
                      case 'Finish':
                        return 'bg-green-400'
                      case 'Cancel':
                        return 'bg-red-400'
                      default:
                        return 'bg-gray-400'
                    }
                  })()} w-3 h-3 border-2 rounded-full z-10`}
                ></div>
                <div className='absolute h-full bg-theming-dark100 bg-opacity-10 dark:bg-opacity-30 w-[2px]'></div>
              </div>
              <div>
                <div className='flex gap-4 items-center'>
                  <Image
                    src={event.employee.profilePicture}
                    alt={event.employee.username}
                    width={30}
                    height={30}
                    className='rounded-full'
                  />
                  <div>
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
                    <p className='text-xs text-gray-400'>
                      {dateUtil(event.created).text}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className='text-center'>The timeline seems to be empty</p>
        )}
      </ul>
      {newTimelineData.count > 0 && (
        <p className='mt-8 font-semibold text-center text-sm'>
          Show all {newTimelineData.count} events
        </p>
      )}
    </div>
  )
}

export default TimelineBanner
