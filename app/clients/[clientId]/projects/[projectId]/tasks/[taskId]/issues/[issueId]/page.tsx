import { Suspense } from 'react'
import { Issue } from './Issue'
import { LoadingProjectsSkeleton } from '../../../../(projectId layout)/LoadingProjectsSkeleton'

const IssueId: React.FC<{
  params: { projectId: string; taskId: string; issueId: string }
}> = (props) => {
  return (
    <section className='flex items-center flex-col'>
      <div className='flex items-start justify-center gap-8 p-8'>
        <Suspense fallback={<LoadingProjectsSkeleton />}>
          <Issue
            projectId={props.params.projectId}
            taskId={props.params.taskId}
            issueId={props.params.issueId}
          />
        </Suspense>
      </div>
    </section>
  )
}

export default IssueId
