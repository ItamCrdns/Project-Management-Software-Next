'use client'
import { DictionaryResponse } from '@/interfaces/DictionaryResponse'
import { Timeline } from '../../(admin layout)/@timeline/Timeline.interface'
import EventsList from '../../(admin layout)/@timeline/EventsList'
import ServerPagination from '@/components/pagination/ServerPagination'
import { useAppSelector } from '@/lib/hooks/hooks'
import { useEffect } from 'react'
import { revalidateTimelineEvents } from './actions/revalidateTimelineEvents'

const ClientTimelineEvents = ({
  prevEvents,
  page
}: {
  prevEvents: DictionaryResponse<Timeline>
  page: number
}) => {
  const reduxEvents = useAppSelector((state) => state.signalR.events.count)

  useEffect(() => {
    const revalidate = async () => {
      if (reduxEvents > 0) {
        await revalidateTimelineEvents()
      }
    }

    revalidate()
  }, [reduxEvents])

  const backendEvents = prevEvents.data ?? []

  return (
    <div className='p-8 m-8 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300 min-w-[500px] flex flex-col justify-center'>
      <h1 className='font-semibold mb-4'>Activity Timeline</h1>
      <EventsList events={backendEvents} />
      <div className='mt-4'>
        <ServerPagination currentPage={page} totalPages={prevEvents.pages} />
      </div>
    </div>
  )
}

export default ClientTimelineEvents
