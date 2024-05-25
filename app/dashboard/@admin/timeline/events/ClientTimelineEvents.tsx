'use client'
import { DictionaryResponse } from '@/interfaces/DictionaryResponse'
import { Timeline } from '../../(admin layout)/@timeline/Timeline.interface'
import { useSignalR } from '@/hooks/useSignalR'
import EventsList from '../../(admin layout)/@timeline/EventsList'
import ServerPagination from '@/components/pagination/ServerPagination'
import { useId } from 'react'
import { useAlertActions } from '@/lib/hooks/Alert actions/useAlertActions'
import { revalidateTimelineEvents } from './actions/revalidateTimelineEvents'

const ClientTimelineEvents = ({
  prevEvents,
  page
}: {
  prevEvents: DictionaryResponse<Timeline>
  page: number
}) => {
  const { setAlert } = useAlertActions()

  const alertId = useId()

  useSignalR(async (event: Timeline) => {
    setAlert({
      id: alertId + '-new-event' + event.timelineId,
      message: event.eventText.trimEnd(),
      type: 'notification'
    })
    try {
      await revalidateTimelineEvents()
    } catch {
      setAlert({
        id: alertId + '-revalidation-failed',
        message:
          'Failed to revalidate timeline events. You might want to refresh the page manually.',
        type: 'error'
      })
    }
  })

  return (
    <div className='p-8 m-8 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300 min-w-[500px] flex flex-col justify-center'>
      <h1 className='font-semibold mb-4'>Activity Timeline</h1>
      <EventsList newTimelineData={prevEvents} />
      <div className='mt-4'>
        <ServerPagination currentPage={page} totalPages={prevEvents.pages} />
      </div>
    </div>
  )
}

export default ClientTimelineEvents
