import { Suspense } from 'react'
import { Loading } from '../Loading'
import { ExtendedSearchParams } from '../ExtendedSearchParams.interface'
import OngoingProjects from './OngoingProjects'

const OngoingProjectsPage: React.FC<{
  params: {
    client: string[]
  }
  searchParams: ExtendedSearchParams
}> = (props) => {
  const key = new URLSearchParams(Object.entries(props.searchParams)).toString()

  return (
    <Suspense
      key={key}
      fallback={
        <Loading
          skeletonCount={Number(props.searchParams.ongoing_pagesize)}
          width={1500}
        />
      }
    >
      <OngoingProjects
        clientId={props.params.client[0]}
        searchParams={props.searchParams}
      />
    </Suspense>
  )
}

export default OngoingProjectsPage
