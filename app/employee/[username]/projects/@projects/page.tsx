import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import { Projects } from '../Projects'
import { Suspense } from 'react'
import { Loading } from '@/app/projects/client/[...client]/Loading'

// Note: created this parallel route because having two fetches in the same component was causing a bug. Maybe Nextjs fault.
const ProjectsParallel: React.FC<{
  params: { username: string }
  searchParams: SearchParamsPageSize
}> = (props) => {
  const { username } = props.params

  const key = new URLSearchParams(Object.entries(props.searchParams)).toString()

  return (
    <Suspense
      key={key}
      fallback={
        <Loading
          skeletonCount={Number(props.searchParams.pagesize)}
          width={1800}
        />
      }
    >
      <Projects username={username} searchParams={props.searchParams} />
    </Suspense>
  )
}

export default ProjectsParallel
