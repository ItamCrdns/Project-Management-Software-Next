import { Suspense } from 'react'
import OverdueProjects from './OverdueProjects'
import { ExtendedSearchParams } from '../ExtendedSearchParams.interface'
import { Loading } from '../Loading'

const OverdueProjectsPage: React.FC<{
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
          skeletonCount={Number(props.searchParams.overdue_pagesize)}
          width={1500}
        />
      }
    >
      <OverdueProjects
        clientId={props.params.clientId}
        searchParams={props.searchParams}
      />
    </Suspense>
  )
}

export default OverdueProjectsPage
