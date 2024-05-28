import { Suspense } from 'react'
import LoadingTasks from './@tasks/loading'
import DataHeader from '@/components/Data Header/DataHeader'
import { Project } from './Project'
import { LoadingProjectsSkeleton } from './LoadingProjectsSkeleton'
import { EntityDivider } from '@/components/UI/EntityDivider'
import { Task } from '@/icons/Task'
import { taskSortValues } from '@/components/Data Header/sortValues'

interface ProjectIdProps {
  children: React.ReactNode
  tasks: React.ReactNode
  params: { clientId: string; projectId: string }
}

const ProjectId: React.FC<ProjectIdProps> = (props) => {
  const { children, tasks, params } = props

  return (
    <section className='flex items-center flex-col'>
      {children}
      <div className='flex flex-col items-start justify-center gap-8 p-8'>
        <div className='flex gap-8 items-start w-full justify-center'>
          <Suspense fallback={<LoadingProjectsSkeleton />}>
            <Project projectId={params.projectId} clientId={params.clientId} />
          </Suspense>
        </div>
        <section className='flex flex-col items-center justify-center'>
          <EntityDivider text='Tasks'>
            <Task />
          </EntityDivider>
          <div className='space-y-8'>
            <DataHeader
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
