import { getTimelineEvent } from '@/api-calls/getTimelineEvent'
import React, { Suspense } from 'react'
import TimelineEvent from './TimelineEvent'

const TimelineEventPage: React.FC<{
  params: {
    eventId: string
  }
}> = (props) => {
  const { eventId } = props.params

  return (
    <Suspense fallback={<>Loading...</>}>
      <TimelineEvent eventId={eventId} />
    </Suspense>
  )
}

export default TimelineEventPage
