import { Suspense } from 'react'
import ProjectUIAndCreate from './Name/ProjectUIAndCreate'
import LoadingProjectUIAndCreateSkeleton from './LoadingProjectUIAndCreateSkeleton'

const NewTask: React.FC<{ params: { clientId: string; projectId: string } }> = (
  props
) => {
  const { clientId, projectId } = props.params

  return (
    <section className='flex items-start justify-center py-8 px-0 space-x-8'>
      <Suspense fallback={<LoadingProjectUIAndCreateSkeleton />}>
        <ProjectUIAndCreate projectId={projectId} clientId={clientId} />
      </Suspense>
    </section>
  )
}

export default NewTask
