import { Suspense } from 'react'
import Events from './Events'
import LoadingTimelineSkeleton from '../../(admin layout)/@timeline/loading'
import { SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import generateQueryParams from '@/utility/queryParams'

const TimelineEventsPage = ({
  searchParams
}: {
  searchParams: SearchParamsPageSize
}) => {
  const queryParams = generateQueryParams(searchParams)

  return (
    <Suspense fallback={<LoadingTimelineSkeleton />}>
      <Events page={queryParams.page} pageSize={queryParams.pageSize} />
    </Suspense>
  )
}

export default TimelineEventsPage
