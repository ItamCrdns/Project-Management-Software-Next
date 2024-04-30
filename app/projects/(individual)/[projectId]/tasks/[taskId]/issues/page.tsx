import { issueSortValues } from '@/app/dashboard/@admin/_issues/sortValues'
import DataHeader from '@/components/Data Header/DataHeader'
import { Suspense } from 'react'
import Task from './Task'
import { Issues } from './Issues'
import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import { Loading } from '@/app/projects/client/[[...client]]/Loading' //* Theyre pretty similar
import LoadingProjectUISkeleton from '@/components/UI/ProjectUI/LoadingProjectUISkeleton'
import Link from 'next/link'
import { ArrowLeftCircle } from '@/svg/ArrowLeftCircle'

const TaskIssues: React.FC<{
  params: { projectId: string, taskId: string }
  searchParams: SearchParamsPageSize
}> = (props) => {
  const { projectId, taskId } = props.params

  const key = new URLSearchParams(Object.entries(props.searchParams)).toString()

  return (
    <section className='flex justify-center'>
      <div>
        <div className='flex items-center justify-between gap-8 my-8 mx-0'>
          <Link
            className='flex gap-2 font-semibold text-theming-dark100 dark:text-theming-white100 cursor-pointer'
            href={`/projects/${projectId}/tasks/${taskId}`}
          >
            <ArrowLeftCircle />
            Return to task
          </Link>
          <h1 className='font-semibold'>Showing all task issues</h1>
        </div>
        <div className='flex justify-end'>
          <DataHeader
            dashboard={false}
            width='300px'
            sortValues={issueSortValues}
            pushSearchParams
          />
        </div>
        <div className='flex items-start gap-8'>
          <Suspense fallback={<LoadingProjectUISkeleton />}>
            <Task projectId={projectId} taskId={taskId} />
          </Suspense>
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
