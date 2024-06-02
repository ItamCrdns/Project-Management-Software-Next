import { Project } from '@/interfaces/project'
import Link from 'next/link'
import { BadgeComponent } from './BadgeComponent'
import { Dates } from './Badges/Dates'
import setEntityPriority from '@/components/Generic Entity Renderer/EntityPriority'
import { dateUtil } from '@/utility/dateUtil'

const ProjectUI = ({
  project,
  clientId
}: { project: Project; clientId: string }) => {
  const priority = setEntityPriority(project.priority ?? 0)

  const wasStarted = `Started ${dateUtil(project.startedWorking).text}`

  return (
    <div className='flex flex-col items-center p-8 gap-2 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
      <h1 className='font-semibold self-start'>Project information</h1>
      <Link
        className='font-bold text-theming-dark100 dark:text-theming-white100'
        href={`/clients/${clientId}/projects/${project.projectId}`}
      >
        {project.name}
      </Link>
      <div className='flex items-start gap-4'>
        {project.lifecycle !== null && (
          <>
            <BadgeComponent
              content={project.lifecycle ?? ''}
              tooltip={`Lifecycle: ${project.lifecycle}`}
            />
            <p className='select-none'>&middot;</p>
          </>
        )}
        {project.startedWorking !== null ? (
          <>
            <BadgeComponent
              content={wasStarted}
              tooltip={new Date(project.startedWorking).toLocaleDateString(
                'en-us',
                {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'UTC'
                }
              )}
            />
            <p className='select-none'>&middot;</p>
          </>
        ) : (
          <>
            <BadgeComponent
              content='Not started'
              color='gray'
              tooltip='No one is working on this project yet'
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
      <div className='p-0 -mt-2 w-full'>
        <Dates
          created={project.created}
          expectedDelivery={project.expectedDeliveryDate}
          finalized={project.finished}
        />
      </div>
    </div>
  )
}

export default ProjectUI
