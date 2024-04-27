import { taskSortValues } from '@/app/dashboard/@admin/@tasks/sortValues'
import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import { Project } from './Project'
import DataHeader from '@/components/Data Header/DataHeader'
import { Tasks } from './Tasks'
import { Suspense } from 'react'
import { Loading } from '@/app/projects/client/[[...client]]/Loading' //* Theyre pretty similar
import LoadingProjectUISkeleton from '@/components/UI/ProjectUI/LoadingProjectUISkeleton'
import Link from 'next/link'
import { ArrowLeftCircle } from '@/svg/ArrowLeftCircle'

interface ProjectTasksProps {
  params: { projectId: string }
  searchParams: SearchParamsPageSize
}

const ProjectTasks: React.FC<ProjectTasksProps> = (props) => {
  const projectId = props.params.projectId

  const key = new URLSearchParams(Object.entries(props.searchParams)).toString()

  return (
    <section className='flex justify-center'>
      <div>
        <div className='flex items-center justify-between gap-8 my-8 mx-0'>
          <Link
            className='flex gap-2 font-semibold text-theming-dark100 dark:text-theming-white100 cursor-pointer'
            href={`/projects/${projectId}`}
          >
            <ArrowLeftCircle />
            Return to project
          </Link>
          <h1 className='font-semibold'>Showing all project tasks</h1>
        </div>
        <div className='flex justify-end'>
          <DataHeader
            dashboard={false}
            width='300px'
            sortValues={taskSortValues}
            pushSearchParams
          />
        </div>
        <div className='flex items-start gap-8'>
          <Suspense fallback={<LoadingProjectUISkeleton />}>
            <Project projectId={projectId} />
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
            <Tasks projectId={projectId} searchParams={props.searchParams} />
          </Suspense>
        </div>
      </div>
    </section>
  )
}

export default ProjectTasks
