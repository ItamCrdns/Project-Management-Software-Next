'use client'
import { useSignalR } from '@/hooks/useSignalR'
import { Timeline } from './Timeline.interface'
import { DictionaryResponse } from '@/interfaces/DictionaryResponse'
import { dateUtil } from '@/utility/dateUtil'
import Image from 'next/image'
import Link from 'next/link'
import { determineColorByEventType } from './determineColorByEventType'
import { EventText } from './EventText'

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
                  className={`${determineColorByEventType(
                    event.type
                  )} w-3 h-3 border-2 rounded-full z-10`}
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
                    <EventText event={event} />
                    <p className='text-xs text-gray-400'>
                      {dateUtil(event.created).text} &middot;{' '}
                      <Link
                        href={`/dashboard/timeline/event/${event.timelineId}`}
                      >
                        See details
                      </Link>
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
