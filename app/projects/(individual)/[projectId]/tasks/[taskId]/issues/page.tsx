import { issueSortValues } from '@/app/dashboard/@admin/_issues/sortValues'
import DataHeader from '@/components/Data Header/DataHeader'
import { Suspense } from 'react'
import Task from './Task'
import { Issues } from './Issues'
import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import { Loading } from '@/app/projects/client/[...client]/Loading' //* Theyre pretty similar
import LoadingProjectUISkeleton from '@/components/UI/ProjectUI/LoadingProjectUISkeleton'

const TaskIssues: React.FC<{
  params: { projectId: string; taskId: string }
  searchParams: SearchParamsPageSize
}> = (props) => {
  const { projectId, taskId } = props.params

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
            <Issues taskId={taskId} searchParams={props.searchParams} />
          </Suspense>
        </div>
      </div>
    </section>
  )
}

export default TaskIssues
