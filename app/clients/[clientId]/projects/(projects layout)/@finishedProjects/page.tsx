import { Suspense } from 'react'
import FinishedProjects from './FinishedProjects'
import { ExtendedSearchParams } from '../ExtendedSearchParams.interface'
import { Loading } from '../Loading'

const FinishedProjectsPage: React.FC<{
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
          skeletonCount={Number(props.searchParams.finalized_pagesize)}
          width={1500}
        />
      }
    >
      <FinishedProjects
        clientId={props.params.clientId}
        searchParams={props.searchParams}
      />
    </Suspense>
  )
}

export default FinishedProjectsPage
