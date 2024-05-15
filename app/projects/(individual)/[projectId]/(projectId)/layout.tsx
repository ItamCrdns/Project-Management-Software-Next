import { Suspense } from 'react'
import LoadingTasks from './@tasks/loading'
import DataHeader from '@/components/Data Header/DataHeader'
import { taskSortValues } from '@/app/dashboard/@admin/_tasks/sortValues'
import { Project } from './Project'
import { LoadingProjectsSkeleton } from './LoadingProjectsSkeleton'
import { EntityDivider } from '@/components/UI/EntityDivider'
import { Task } from '@/svg/Task'

interface ProjectIdProps {
  children: React.ReactNode
  tasks: React.ReactNode
  params: { projectId: string }
}

const ProjectId: React.FC<ProjectIdProps> = (props) => {
  const { children, tasks, params } = props

  return (
    <section className='flex items-center flex-col'>
      {children}
      <div className='flex flex-col items-start justify-center gap-8 p-8'>
        <div className='flex gap-8 items-start w-full justify-center'>
          <Suspense fallback={<LoadingProjectsSkeleton />}>
            <Project projectId={params.projectId} />
          </Suspense>
        </div>
        <section className='flex flex-col items-center justify-center'>
          <EntityDivider text='Tasks'>
            <Task />
          </EntityDivider>
          <div className='space-y-8'>
            <DataHeader
              dashboard={false}
              width='300px'
              pushSearchParams={false}
              sortValues={taskSortValues}
            />
            <Suspense fallback={<LoadingTasks />}>{tasks}</Suspense>
          </div>
        </section>
      </div>
    </section>
  )
}

export default ProjectId
