import Link from 'next/link'
import { setEntityPriority } from '@/components/Generic Entity Renderer/EntityPriority'
import { Button } from '@/components/Button/Button'
import { type ProjectUIProps } from './ProjectUI.interface'
import { BadgeComponent } from './BadgeComponent'
import { getRelativeTimeString } from '@/utility/relativeTime'
import { TeamAndCreator } from '../TeamAndCreator'
import { Info } from '@/svg/Info'

const ProjectUI: React.FC<ProjectUIProps> = (props) => {
  const { project, showButtons, employeeCountHref, showGeneralInfo } = props

  const priority = setEntityPriority(project?.entity.priority ?? 0)

  const wasStarted = getRelativeTimeString(project?.entity.startedWorking ?? '')

  const team = project?.entity.team

  return (
    <aside className='flex flex-col items-center gap-8'>
      <div className='flex flex-col gap-4 min-w-56'>
        <div className='w-full space-y-2'>
          {showGeneralInfo === true && (
            <div className='flex items-center justify-center gap-2'>
              <h1 className='text-center font-semibold'>General information</h1>
              <Info />
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
        <TeamAndCreator
          creator={project?.entity.creator}
          team={team}
          teamCount={project?.entity.employeeCount}
          teamHref={employeeCountHref}
        />
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
