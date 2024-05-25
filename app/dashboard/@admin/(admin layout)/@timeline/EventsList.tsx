import { AnimatePresence, motion } from 'framer-motion'
import { determineColorByEventType } from './determineColorByEventType'
import { EventText } from './EventText'
import Image from 'next/image'
import Link from 'next/link'
import { dateUtil } from '@/utility/dateUtil'
import { DictionaryResponse } from '@/interfaces/DictionaryResponse'
import { Timeline } from './Timeline.interface'

const EventsList = ({
  newTimelineData
}: { newTimelineData: DictionaryResponse<Timeline> }) => {
  const events = newTimelineData.data ?? []

  return (
    <ul>
      <AnimatePresence mode='popLayout'>
        {newTimelineData.count > 0 ? (
          events.map((event, index) => (
            <motion.li
              key={event.timelineId}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ duration: 0.15, delay: index * 0.025 }}
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
  )
}

export default EventsList
