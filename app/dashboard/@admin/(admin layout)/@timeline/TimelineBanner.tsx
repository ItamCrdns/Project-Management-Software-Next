'use client'
import { useSignalR } from '@/hooks/useSignalR'
import { Timeline } from './Timeline.interface'
import { DictionaryResponse } from '@/interfaces/DictionaryResponse'
import { dateUtil } from '@/utility/dateUtil'
import Image from 'next/image'
import Link from 'next/link'
import { determineColorByEventType } from './determineColorByEventType'
import { EventText } from './EventText'
import { AnimatePresence, motion } from 'framer-motion'

interface TimelineBannerProps {
  prevEvents: DictionaryResponse<Timeline> | null
}

const TimelineBanner: React.FC<TimelineBannerProps> = (props) => {
  const { prevEvents } = props

  const newTimelineData = useSignalR(
    'ReceiveTimelineEvent',
    prevEvents ?? { data: [], count: 0, pages: 0 }
  )

  const events = newTimelineData.data ?? []

  return (
    <div className='p-8 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300 min-w-[500px]'>
      <h1 className='font-semibold mb-4'>Activity Timeline</h1>
      <ul>
        <AnimatePresence mode='popLayout'>
          {newTimelineData.count > 0 ? (
            events.map((event, index) => (
              <motion.li
                key={event.timelineId}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.025 }}
                className='flex items-center gap-4 relative h-[75px]'
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
              </motion.li>
            ))
          ) : (
            <p className='text-center'>The timeline seems to be empty</p>
          )}
        </AnimatePresence>
      </ul>
      {newTimelineData.count > 0 && (
        <p className='mt-4 font-semibold text-center text-sm'>
          Show all {newTimelineData.count} events
        </p>
      )}
    </div>
  )
}

export default TimelineBanner
