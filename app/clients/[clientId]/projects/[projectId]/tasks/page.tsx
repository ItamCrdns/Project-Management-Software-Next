import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import DataHeader from '@/components/Data Header/DataHeader'
import { Tasks } from './Tasks'
import { Suspense } from 'react'
import LoadingProjectUISkeleton from '@/components/UI/ProjectUI/LoadingProjectUISkeleton'
import { Loading } from '@/app/clients/[clientId]/projects/(projects layout)/Loading'
import { ProjectInfoAndFilters } from './ProjectInfoAndFilters'
import { taskSortValues } from '@/components/Data Header/sortValues'

const ProjectTasks: React.FC<{
  params: { clientId: string; projectId: string }
  searchParams: SearchParamsPageSize
}> = (props) => {
  const { clientId, projectId } = props.params

  const key = new URLSearchParams(Object.entries(props.searchParams)).toString()

  return (
    <section className='flex flex-col justify-center gap-4 p-8'>
      <div className='flex items-start justify-center gap-8'>
        <Suspense fallback={<LoadingProjectUISkeleton />}>
          <ProjectInfoAndFilters projectId={projectId} clientId={clientId} />
        </Suspense>
        <div className='space-y-8'>
          <DataHeader
            width='300px'
            sortValues={taskSortValues}
            pushSearchParams
          />
          <Suspense
            key={key}
            fallback={
              <Loading
                skeletonCount={Number(props.searchParams.pagesize)}
                width={1200}
              />
            }
          >
            <Tasks
              projectId={projectId}
              clientId={clientId}
              searchParams={props.searchParams}
            />
          </Suspense>
        </div>
      </div>
    </section>
  )
}

export default ProjectTasks
