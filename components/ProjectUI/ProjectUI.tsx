import { type Employee } from '@/interfaces/employee'
import { IndividualEmployee } from '@/components/Generic Entity Renderer/IndividualEmployee'
import Link from 'next/link'
import { setEntityPriority } from '@/components/Generic Entity Renderer/EntityPriority'
import { Button } from '@/components/Button/Button'
import { Creator } from '@/svg/Creator'
import { Users } from '@/svg/Users'
import { type ProjectUIProps } from './ProjectUI.interface'
import ProjectCreator from '@/app/projects/(individual)/[projectId]/(projectId)/ProjectCreator'
import { BadgeComponent } from './BadgeComponent'
import { getRelativeTimeString } from '@/utility/relativeTime'

const ProjectUI: React.FC<ProjectUIProps> = (props) => {
  const { project, showButtons, employeeCountHref, showGeneralInfo } = props

  const priority = setEntityPriority(project?.entity.priority ?? 0)

  const wasStarted = getRelativeTimeString(project?.entity.startedWorking ?? '')

  return (
    <aside className='flex flex-col items-center gap-8'>
      <div className='flex flex-col gap-4 min-w-56'>
        <div className='w-full space-y-2'>
          {showGeneralInfo === true && (
            <div className='flex items-center justify-center gap-2'>
              <h1 className='text-center font-semibold'>General information</h1>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z'
                />
              </svg>
            </div>
          )}
          <div className='flex flex-col items-center p-4 gap-2 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
            <Link
              className='font-bold text-theming-dark100 dark:text-theming-white100'
              href={`/projects/${project?.entity.projectId}`}
            >
              {project?.entity.name}
            </Link>
            <div className='flex items-start gap-4'>
              {project?.entity.lifecycle !== null && (
                <>
                  <BadgeComponent
                    content={project?.entity.lifecycle ?? ''}
                    tooltip={`Project lifecyle is ${project?.entity.lifecycle}`}
                  />
                  <p className='select-none'>&middot;</p>
                </>
              )}
              {project?.entity.startedWorking !== null && (
                <>
                  <BadgeComponent
                    content={wasStarted}
                    tooltip={`Project was started ${wasStarted}`}
                  />
                  <p className='select-none'>&middot;</p>
                </>
              )}
              <BadgeComponent
                content={priority.priorityText}
                color={priority.color}
                tooltip={`Project has a ${priority.priorityText} priority`}
              />
            </div>
          </div>
        </div>
        <div className='flex items-center gap-4 flex-col'>
          <div className='w-full space-y-2'>
            <div className='flex items-center justify-center gap-2'>
              <h1 className='text-center font-semibold'>Created by</h1>
              <Creator />
            </div>
            {project?.entity.creator !== undefined && (
              <div className='flex justify-center p-4 bg-theming-white100 dark:bg-theming-dark300 rounded-md shadow-md'>
                <ProjectCreator
                  creator={project?.entity.creator}
                  pictureSize={35}
                  showUsername={true}
                  position={{ left: '1rem' }}
                />
              </div>
            )}
          </div>
          {Array.isArray(project?.entity.team) &&
            project?.entity.team.length > 0 && (
              <div className='w-full space-y-2'>
                <div className='flex items-center justify-center gap-2'>
                  <h1 className='text-center font-semibold'>Team</h1>
                  <Users />
                </div>
                <ul className='rounded-md w-full shadow-md bg-theming-white100 dark:bg-theming-dark300 p-4 flex flex-col gap-4 items-center justify-center'>
                  {project?.entity.team.map(
                    (employee: Employee, index: number) => (
                      <li key={index} className='relative'>
                        <IndividualEmployee
                          employee={employee}
                          size={35}
                          redirectMe={true}
                          showName={true}
                          position={{ left: '1rem' }}
                        />
                      </li>
                    )
                  )}
                </ul>
                <p className='text-center font-semibold text-sm'>
                  {employeeCountHref !== '' &&
                  employeeCountHref !== undefined
                    ? (
                    <Link href={employeeCountHref}>
                      {project?.entity.employeeCount} employees in this team
                    </Link>
                      )
                    : (
                    `${project?.entity.employeeCount} employees in this team`
                      )}
                </p>
              </div>
          )}
        </div>
      </div>
      {showButtons && (
        <div className='space-x-4'>
          {project?.isOwner === true && (
            <Button
              text='Create new task'
              href={`/projects/${project?.entity.projectId}/tasks/create`}
            />
          )}
          {project?.isParticipant === true && (
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
