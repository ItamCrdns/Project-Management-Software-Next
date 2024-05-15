import { taskSortValues } from '@/app/dashboard/@admin/_tasks/sortValues'
import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import { Project } from './Project'
import DataHeader from '@/components/Data Header/DataHeader'
import { Tasks } from './Tasks'
import { Suspense } from 'react'
import { Loading } from '@/app/projects/client/[...client]/Loading' //* Theyre pretty similar
import LoadingProjectUISkeleton from '@/components/UI/ProjectUI/LoadingProjectUISkeleton'

const ProjectTasks: React.FC<{
  params: { projectId: string }
  searchParams: SearchParamsPageSize
}> = (props) => {
  const projectId = props.params.projectId

  const key = new URLSearchParams(Object.entries(props.searchParams)).toString()

  return (
    <section className='flex flex-col justify-center gap-4 p-8'>
      <div className='flex items-start justify-center gap-8'>
        <Suspense fallback={<LoadingProjectUISkeleton />}>
          <Project projectId={projectId} />
        </Suspense>
        <div className='space-y-8'>
          <DataHeader
            dashboard={false}
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
            <Tasks projectId={projectId} searchParams={props.searchParams} />
          </Suspense>
        </div>
      </div>
    </section>
  )
}

export default ProjectTasks
