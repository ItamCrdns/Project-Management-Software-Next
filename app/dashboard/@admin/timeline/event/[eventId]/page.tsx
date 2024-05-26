import { Suspense } from 'react'
import TimelineEvent from './TimelineEvent'
import LoadingEventSkeleton from './LoadingEventSkeleton'

const TimelineEventPage: React.FC<{
  params: {
    eventId: string
  }
}> = (props) => {
  const { eventId } = props.params

  return (
    <Suspense fallback={<LoadingEventSkeleton />}>
      <TimelineEvent eventId={eventId} />
    </Suspense>
  )
}

export default TimelineEventPage
