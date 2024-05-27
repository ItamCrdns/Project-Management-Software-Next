import { Button } from '@/components/Button/Button'
import { type ProjectUIProps } from './ProjectUI.interface'
import { TeamAndCreator } from '../TeamAndCreator'
import { EntityNotFound } from '../EntityNotFound'
import ProjectUI from './ProjectUI'

const ProjectUIWithButtons: React.FC<ProjectUIProps> = (props) => {
  const { project, clientId, showButtons, employeeCountHref, noProject } = props

  if (noProject) {
    return <EntityNotFound entity='Project' />
  }

  const team = project?.entity.team

  return (
    <aside className='flex flex-col items-center gap-4'>
      <div className='flex flex-col gap-8 w-[400px]'>
        <div className='w-full space-y-2'>
          {project?.entity && (
            <ProjectUI project={project?.entity} clientId={clientId} />
          )}
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
              href={`/clients/${clientId}/projects/${project?.entity.projectId}/tasks/create`}
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

export default ProjectUIWithButtons
