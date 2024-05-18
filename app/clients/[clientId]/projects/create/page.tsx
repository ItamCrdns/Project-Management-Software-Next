import { Suspense } from 'react'
import ClientUIAndCreate from './ClientUIAndCreate'
import LoadingClientUIAndCreateSkeleton from './LoadingClientUIAndCreateSkeleton'

const CreateProject: React.FC<{ params: { clientId: string } }> = (props) => {
  const { clientId } = props.params

  return (
    <section className='flex items-start justify-center py-8 px-0 space-x-8'>
      <Suspense fallback={<LoadingClientUIAndCreateSkeleton />}>
        <ClientUIAndCreate clientId={clientId} />
      </Suspense>
    </section>
  )
}

export default CreateProject
