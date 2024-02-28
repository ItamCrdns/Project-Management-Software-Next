import ProjectCreator from '../(projectId)/ProjectCreator'
import { type Employee } from '@/interfaces/employee'
import { IndividualEmployee } from '@/components/Generic Entity Renderer/IndividualEmployee'
import { type Position } from '@/components/Generic Entity Renderer/IEmployeeListProps'
import Link from 'next/link'
import { setEntityPriority } from '@/components/Generic Entity Renderer/EntityPriority'
import { Button } from '@/components/Button/Button'
import { type ProjectUIProps } from './ProjectUI.interface'

const ProjectUI: React.FC<ProjectUIProps> = (props) => {
  const { project, showButtons } = props

  const projectCreator = project?.entity.creator

  const creatorPicturePosition: Position = {
    top: '1rem',
    right: '-5rem'
  }

  const isProjectParticipant = project?.isParticipant
  const isProjectOwner = project?.isOwner

  const priority = setEntityPriority(project?.entity.priority ?? 0)

  return (
    <aside className='flex flex-col items-center gap-8 max-w-sm'>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col items-center p-4 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
          <Link
            className='font-bold text-theming-dark100 dark:text-theming-white100'
            href={`/projects/${project?.entity.projectId}`}
          >
            {project?.entity.name}
          </Link>
          <div className='flex items-start gap-4'>
            <p>{project?.entity.lifecycle}</p>
            <p className='select-none'>&middot;</p>
            <p style={{ color: priority.color }}>{priority.priorityText}</p>
          </div>
        </div>
        <div className='flex items-center gap-4 flex-col'>
          <div className='rounded-md w-full'>
            <h1 className='text-center font-semibold mb-1'>Created by</h1>
            {projectCreator !== undefined && (
              <div className='p-4 bg-theming-white100 dark:bg-theming-dark300 rounded-md shadow-md'>
                <ProjectCreator
                  creator={projectCreator}
                  pictureSize={50}
                  showUsername={true}
                  position={creatorPicturePosition}
                />
              </div>
            )}
          </div>
          <div className='rounded-md w-full'>
            <h1 className='text-center font-semibold mb-1'>Team</h1>
            <ul className='rounded-md w-full shadow-md bg-theming-white100 dark:bg-theming-dark300 p-4'>
              {project?.entity.team.map((employee: Employee, index: number) => (
                <li key={index} className='p-4 relative'>
                  <IndividualEmployee
                    employee={employee}
                    size={40}
                    redirectMe={true}
                    showName={true}
                    position={{ left: '1rem' }}
                  />
                </li>
              ))}
              <p className='text-center font-semibold'>{project?.entity.employeeCount} employees in this team</p>
            </ul>
          </div>
        </div>
      </div>
      {showButtons && (
        <div className='space-x-4'>
          {isProjectOwner === true && (
            <Button
              text='Create new task'
              href={`/projects/${project.entity.projectId}/tasks/create`}
            />
          )}
          {isProjectParticipant === true && (
            <div className='flex gap-4 flex-col'>
              <Button text='My tasks' />
              <Button text='Request new task' />
            </div>
          )}
        </div>
      )}
    </aside>
  )
}

export default ProjectUI
