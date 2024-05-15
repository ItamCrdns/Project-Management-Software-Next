import { Suspense } from 'react'
import { Loading } from '../Loading'
import { ExtendedSearchParams } from '../ExtendedSearchParams.interface'
import NotStartedProjects from './NotStartedProjects'

const NotStartedProjectsPage: React.FC<{
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
          skeletonCount={Number(props.searchParams.not_started_pagesize)}
          width={1500}
        />
      }
    >
      <NotStartedProjects
        clientId={props.params.client[0]}
        searchParams={props.searchParams}
      />
    </Suspense>
  )
}

export default NotStartedProjectsPage
