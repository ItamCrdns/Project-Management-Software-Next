import React from 'react'
import TimelineBanner from './TimelineBanner'
import { getTimelineEvents } from '@/api-calls/getTimelineEvents'

const TimelinePage = async () => {
  const { data: events, status } = await getTimelineEvents('1', '10')

  if (events === null || status !== 200) {
    return <div>Failed to load events</div>
  }

  return <TimelineBanner prevEvents={events} />
}

export default TimelinePage
