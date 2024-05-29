import { Timeline } from '@/app/dashboard/@admin/(admin layout)/@timeline/Timeline.interface'
import { DataCountPages } from '@/interfaces/DataCountPages.interface'
import paginatedFetcher from '@/utility/paginatedFetcher'

export const getTimelineEvents = async (
  page: string,
  pageSize: string,
  tag?: string
) => {
  const nextTags = tag ? [tag] : undefined
  return await paginatedFetcher<DataCountPages<Timeline>>(
    'Timeline/events/all',
    page,
    pageSize,
    nextTags
  )
}
