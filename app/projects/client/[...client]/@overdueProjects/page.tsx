import { Suspense } from 'react'
import { Loading } from '../Loading'
import { ExtendedSearchParams } from '../ExtendedSearchParams.interface'
import OverdueProjects from './OverdueProjects'

const OverdueProjectsPage: React.FC<{
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
          skeletonCount={Number(props.searchParams.overdue_pagesize)}
          width={1500}
        />
      }
    >
      <OverdueProjects
        clientId={props.params.client[0]}
        searchParams={props.searchParams}
      />
    </Suspense>
  )
}

export default OverdueProjectsPage
