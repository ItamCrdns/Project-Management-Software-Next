import { Timeline } from '@/app/dashboard/@admin/(admin layout)/@timeline/Timeline.interface'
import { DictionaryResponse } from '@/interfaces/DictionaryResponse'
import paginatedFetcher from '@/utility/paginatedFetcher'

export const getTimelineEvents = async (page: string, pageSize: string) =>
  await paginatedFetcher<DictionaryResponse<Timeline>>(
    'Timeline/events/all',
    page,
    pageSize,
    ['getTimelineEvents']
  )
