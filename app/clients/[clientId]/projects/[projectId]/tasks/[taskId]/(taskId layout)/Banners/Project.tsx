import { type Project as ProjectType } from '@/interfaces/project'
import { Project as ProjectIcon } from '@/svg/Project'
import Link from 'next/link'

const Project: React.FC<{ project?: ProjectType }> = (props) => {
  const { project } = props
  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-center gap-2'>
        <h1 className='text-center font-semibold'>Project</h1>
        <ProjectIcon />
      </div>
      <div className='p-4 space-y-4 rounded-md shadow-md flex items-center justify-center bg-theming-white100 dark:bg-theming-dark300 min-w-52 max-w-96'>
        <Link
          href={`/clients/${project?.clientId}/projects/${project?.projectId}`}
          className='font-semibold text-lg'
        >
          {project?.name}
        </Link>
      </div>
    </div>
  )
}

export { Project }
