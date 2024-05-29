'use client'
import { Timeline } from './Timeline.interface'
import Link from 'next/link'
import EventsList from './EventsList'
import { useAppSelector } from '@/lib/hooks/hooks'
import { DataCountPages } from '@/interfaces/DataCountPages.interface'

interface TimelineBannerProps {
  prevEvents: DataCountPages<Timeline>
}

const TimelineBanner: React.FC<TimelineBannerProps> = (props) => {
  const { prevEvents } = props

  const reduxEvents = useAppSelector((state) => state.signalR.events)
  const backendEvents = prevEvents.data ?? []

  // Merge the events from the backend and the redux store, and remove duplicates
  // Might not be the best way to do this, but it works for now
  const newData = [...reduxEvents.data, ...backendEvents].filter(
    (value, index, arr) => {
      return arr.findIndex((x) => x.timelineId === value.timelineId) === index
    }
  )

  const events = {
    data: newData.length > 10 ? newData.slice(0, 10) : newData,
    count: prevEvents.count + newData.length
  }

  return (
    <div className='p-8 my-8 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300 min-w-[500px] flex flex-col justify-center'>
      <h1 className='font-semibold mb-4'>Activity Feed</h1>
      <EventsList events={events.data} />
      {events.count > 0 && (
        <Link
          href='dashboard/timeline/events'
          className='mt-4 font-semibold text-center text-sm'
        >
          See all {events.count} events
        </Link>
      )}
    </div>
  )
}

export default TimelineBanner
