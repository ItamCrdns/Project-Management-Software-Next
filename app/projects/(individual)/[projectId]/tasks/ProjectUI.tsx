import ProjectCreator from '../(projectId)/ProjectCreator'
import { type Employee } from '@/interfaces/employee'
import EmployeeOfTheList from '@/components/Generic Entity Renderer/EmployeeOfTheList'
import { type Position } from '@/components/Generic Entity Renderer/IEmployeeListProps'
import getProjectLimited from '@/api-calls/getProjectLimited'
import Link from 'next/link'
import { setEntityPriority } from '@/components/Generic Entity Renderer/EntityPriority'
import { Button } from '@/components/Button/Button'

interface ProjectUIProps {
  projectId: string
}

const ProjectUI: React.FC<ProjectUIProps> = async (props) => {
  const { data } = await getProjectLimited(props.projectId)

  const project = data?.entity
  const projectCreator = project?.creator

  const creatorPicturePosition: Position = {
    top: '1rem',
    right: '-5rem'
  }

  const isProjectParticipant = data?.isParticipant
  const isProjectOwner = data?.isOwner

  const priority = setEntityPriority(project?.priority ?? 0)

  return (
    <aside className='flex flex-col items-center gap-8 max-w-sm'>
      <div className='flex flex-col gap-8'>
        <div className='relative flex flex-col items-center p-4 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
          <h1 className='absolute left-2 -top-7'>Project name</h1>
          <Link
            className='font-bold text-theming-dark100 dark:text-theming-white100'
            href={`/projects/${project?.projectId}`}
          >
            {project?.name}
          </Link>
          <div className='flex items-start gap-4'>
            <p>{project?.lifecycle}</p>
            <p className='select-none'>&middot;</p>
            <p style={{ color: priority.color }}>{priority.priorityText}</p>
          </div>
        </div>
        <div className='flex items-center gap-8 flex-col'>
          <div className='relative rounded-md w-full shadow-md bg-theming-white100 dark:bg-theming-dark300'>
            <h1 className='absolute left-2 -top-7'>Project creator</h1>
            <div className='p-4'>
              <ProjectCreator
                creator={projectCreator as Employee}
                pictureSize={50}
                showUsername={true}
                position={creatorPicturePosition}
              />
            </div>
          </div>
          <ul className='relative rounded-md w-full shadow-md bg-theming-white100 dark:bg-theming-dark300'>
            <h1 className='absolute left-2 -top-7'>Team</h1>
            {project?.team.map((employee: Employee, index: number) => (
              <div key={index} className='p-4'>
                <EmployeeOfTheList
                  employee={employee}
                  size={35}
                  redirectMe={true}
                />
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className='space-x-4'>
        {isProjectOwner === true && <Button text='Create new task' />}
        {isProjectParticipant === true && (
          <div className='space-x-4'>
            <Button text='My tasks' />
            <Button text='Request new task' />
          </div>
        )}
      </div>
    </aside>
  )
}

export default ProjectUI
