import React from 'react'
import TimelineBanner from './TimelineBanner'
import { getTimelineEvents } from '@/api-calls/getTimelineEvents'

const TimelinePage = async () => {
  const { data: events } = await getTimelineEvents('1', '10')

  return (
    <>
      <TimelineBanner prevEvents={events} />
    </>
  )
}

export default TimelinePage
