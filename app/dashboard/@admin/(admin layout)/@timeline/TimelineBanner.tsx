'use client'
import { useSignalR } from '@/hooks/useSignalR'
import { Timeline } from './Timeline.interface'
import { DictionaryResponse } from '@/interfaces/DictionaryResponse'
import Link from 'next/link'
import EventsList from './EventsList'
import { useAlertActions } from '@/lib/hooks/Alert actions/useAlertActions'
import { useId, useState } from 'react'

interface TimelineBannerProps {
  prevEvents: DictionaryResponse<Timeline>
}

const TimelineBanner: React.FC<TimelineBannerProps> = (props) => {
  const { prevEvents } = props

  const [timelineData, setTimelineData] =
    useState<DictionaryResponse<Timeline>>(prevEvents)

  const { setAlert } = useAlertActions()

  const alertId = useId()

  useSignalR((event: Timeline) => {
    setAlert({
      id: alertId + '-new-event' + event.timelineId,
      message: event.eventText.trimEnd(),
      type: 'notification'
    })

    setTimelineData((prevData) => {
      const newData = [...(prevData.data ?? [])]

      newData.unshift(event)

      if (newData.length > 1) {
        newData.pop() // remove the last element
      }

      return {
        data: newData,
        count: prevData.count + 1,
        pages: prevData.pages // Maybe we need to recalculate this?
      }
    })
  })

  return (
    <div className='p-8 my-8 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300 min-w-[500px] flex flex-col justify-center'>
      <h1 className='font-semibold mb-4'>Activity Feed</h1>
      <EventsList newTimelineData={timelineData} />
      {timelineData.count > 0 && (
        <Link
          href='dashboard/timeline/events'
          className='mt-4 font-semibold text-center text-sm'
        >
          See all {timelineData.count} events
        </Link>
      )}
    </div>
  )
}

export default TimelineBanner
