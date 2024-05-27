import Link from 'next/link'

const Project: React.FC<{
  name?: string
  clientId: string
  projectId: string
}> = (props) => {
  return (
    <div className='p-8 space-y-4 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
      <h1 className='font-semibold'>Project</h1>
      <h1>
        <Link href={`/clients/${props.clientId}/projects/${props.projectId}`}>
          {props.name}
        </Link>
      </h1>
    </div>
  )
}

export { Project }
