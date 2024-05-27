import Link from 'next/link'

const Task = ({
  name,
  clientId,
  projectId,
  taskId
}: {
  name?: string
  clientId: string
  projectId: string
  taskId: string
}) => {
  return (
    <div className='p-8 space-y-4 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
      <h1 className='font-semibold'>Task</h1>
      <h1>
        <Link
          href={`/clients/${clientId}/projects/${projectId}/tasks/${taskId}`}
        >
          {name}
        </Link>
      </h1>
    </div>
  )
}

export default Task
