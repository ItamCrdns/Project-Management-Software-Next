import { issueSortValues } from '@/app/dashboard/@admin/_issues/sortValues'
import DataHeader from '@/components/Data Header/DataHeader'
import { Suspense } from 'react'
import Task from './Task'
import { Issues } from './Issues'
import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import LoadingProjectUISkeleton from '@/components/UI/ProjectUI/LoadingProjectUISkeleton'
import { Loading } from '@/app/clients/[clientId]/projects/(projects layout)/Loading'

const TaskIssues: React.FC<{
  params: { clientId: string; projectId: string; taskId: string }
  searchParams: SearchParamsPageSize
}> = (props) => {
  const { clientId, projectId, taskId } = props.params

  const key = new URLSearchParams(Object.entries(props.searchParams)).toString()

  return (
    <section className='flex flex-col justify-center gap-4 p-8'>
      <div className='flex items-start justify-center gap-8'>
        <Suspense fallback={<LoadingProjectUISkeleton />}>
          <Task projectId={projectId} taskId={taskId} />
        </Suspense>
        <div className='space-y-8'>
          <DataHeader
            dashboard={false}
            width='300px'
            sortValues={issueSortValues}
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
            <Issues
              taskId={taskId}
              clientId={clientId}
              searchParams={props.searchParams}
            />
          </Suspense>
        </div>
      </div>
    </section>
  )
}

export default TaskIssues
