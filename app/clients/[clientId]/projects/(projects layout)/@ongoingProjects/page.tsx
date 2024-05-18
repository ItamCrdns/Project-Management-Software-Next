import { Suspense } from 'react'
import OngoingProjects from './OngoingProjects'
import { ExtendedSearchParams } from '../ExtendedSearchParams.interface'
import { Loading } from '../Loading'

const OngoingProjectsPage: React.FC<{
  params: {
    clientId: string
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
        clientId={props.params.clientId}
        searchParams={props.searchParams}
      />
    </Suspense>
  )
}

export default OngoingProjectsPage
