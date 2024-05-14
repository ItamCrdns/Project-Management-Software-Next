import { SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import { Suspense } from 'react'
import NotStartedProjects from './NotStartedProjects'
import { Loading } from '../Loading'

const NotStartedProjectsPage: React.FC<{
  params: {
    client: string[]
  }
  searchParams: SearchParamsPageSize
}> = (props) => {
  const reactSuspenseKey = new URLSearchParams(
    Object.entries(props.searchParams)
  ).toString()

  return (
    <Suspense
      key={reactSuspenseKey}
      fallback={
        <Loading
          skeletonCount={Number(props.searchParams.pagesize)}
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
