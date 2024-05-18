import { Suspense } from 'react'
import NotStartedProjects from './NotStartedProjects'
import { ExtendedSearchParams } from '../ExtendedSearchParams.interface'
import { Loading } from '../Loading'

const NotStartedProjectsPage: React.FC<{
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
          skeletonCount={Number(props.searchParams.not_started_pagesize)}
          width={1500}
        />
      }
    >
      <NotStartedProjects
        clientId={props.params.clientId}
        searchParams={props.searchParams}
      />
    </Suspense>
  )
}

export default NotStartedProjectsPage
