import { Suspense } from 'react'
import { Loading } from '../Loading'
import { ExtendedSearchParams } from '../ExtendedSearchParams.interface'
import FinishedProjects from './FinishedProjects'

const FinishedProjectsPage: React.FC<{
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
          skeletonCount={Number(props.searchParams.finalized_pagesize)}
          width={1500}
        />
      }
    >
      <FinishedProjects
        clientId={props.params.client[0]}
        searchParams={props.searchParams}
      />
    </Suspense>
  )
}

export default FinishedProjectsPage
