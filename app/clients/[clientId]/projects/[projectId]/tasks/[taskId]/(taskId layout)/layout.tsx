import { Suspense } from 'react'
import Task from './Task'
import { LoadingProjectsSkeleton } from '../../../(projectId layout)/LoadingProjectsSkeleton'
import LoadingIssues from './@issues/loading'
import { EntityDivider } from '@/components/UI/EntityDivider'
import { Issue } from '@/icons/Issue'
import DataHeader from '@/components/Data Header/DataHeader'
import { issueSortValues } from '@/components/Data Header/sortValues'

const TaskId: React.FC<{
  params: { clientId: string; projectId: string; taskId: string }
  issues: React.ReactNode
}> = (props) => {
  const { projectId, taskId } = props.params

  return (
    <section className='flex items-center flex-col'>
      <div className='flex items-start justify-center gap-8 p-8'>
        <Suspense fallback={<LoadingProjectsSkeleton />}>
          <Task
            clientId={props.params.clientId}
            projectId={projectId}
            taskId={taskId}
          />
        </Suspense>
      </div>
      <section className='flex flex-col items-center justify-center'>
        <EntityDivider text='Issues'>
          <Issue />
        </EntityDivider>
        <div className='space-y-8'>
          <DataHeader
            width='300px'
            pushSearchParams={false}
            sortValues={issueSortValues}
          />
          <Suspense fallback={<LoadingIssues />}>{props.issues}</Suspense>
        </div>
      </section>
    </section>
  )
}

export default TaskId
