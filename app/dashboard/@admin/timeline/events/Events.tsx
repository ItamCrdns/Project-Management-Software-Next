import { getTimelineEvents } from '@/api-calls/getTimelineEvents'
import ClientTimelineEvents from './ClientTimelineEvents'

const Events = async ({
  page = '1',
  pageSize = '10'
}: {
  page?: string
  pageSize?: string
}) => {
  const { data: events, status } = await getTimelineEvents(
    page,
    pageSize,
    'getTimelineEvents'
  )

  if (events === null || status !== 200) {
    return <div>Failed to load events</div>
  }

  return <ClientTimelineEvents prevEvents={events} page={Number(page)} />
}

export default Events
