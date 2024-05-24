import { Timeline } from '@/app/dashboard/@admin/(admin layout)/@timeline/Timeline.interface'
import fetcher from '@/utility/fetcher'

export const getTimelineEvent = async (eventId: string) =>
  await fetcher<Timeline>(
    `${process.env.NEXT_PUBLIC_API_URL}Timeline/events/${eventId}`
  )
