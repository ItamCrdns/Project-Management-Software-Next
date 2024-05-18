import { TeamAndCreator } from '../TeamAndCreator'
import { type TaskUIProps } from './TaskUI.interface'
import { Info } from '@/svg/Info'
import Link from 'next/link'
import { Dates } from '../ProjectUI/Badges/Dates'
import { BadgeComponent } from '../ProjectUI/BadgeComponent'
import { dateUtil } from '@/utility/dateUtil'
import { EntityNotFound } from '../EntityNotFound'

const TaskUI: React.FC<TaskUIProps> = (props) => {
  const { task, employeeCountHref, showGeneralInfo, noTask } = props

  if (noTask) {
    return <EntityNotFound entity='Task' />
  }

  return (
    <aside className='flex flex-col items-center gap-8'>
      <div className='flex flex-col gap-8 w-[400px]'>
        <div className='w-full space-y-2'>
          {showGeneralInfo === true && (
            <div className='flex items-center justify-center gap-2'>
              <h1 className='text-center font-semibold'>Task information</h1>
              <Info />
            </div>
          )}
          <div className='flex flex-col items-center p-4 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
            <div className='flex gap-4 items-center'>
              <Link
                className='font-bold text-theming-dark100 dark:text-theming-white100'
                href={`/clients/${task?.entity.project.clientId}/projects/${task?.entity.project.projectId}/tasks/${task?.entity.taskId}`}
              >
                {task?.entity.name}
              </Link>
              {task?.entity.startedWorking !== null &&
                task?.entity.startedWorking !== undefined && (
                  <BadgeComponent
                    content={dateUtil(task?.entity.startedWorking).text}
                    tooltip={new Date(
                      task?.entity.startedWorking
                    ).toLocaleDateString('en-us', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      timeZone: 'UTC'
                    })}
                  />
                )}
            </div>
            <Dates
              created={task?.entity.created}
              expectedDelivery={task?.entity.expectedDeliveryDate}
              finalized={task?.entity.finished}
            />
          </div>
        </div>
        <TeamAndCreator
          creator={task?.entity.taskCreator}
          team={task?.entity.employees}
          teamCount={task?.entity.employeeCount}
          teamHref={employeeCountHref}
        />
      </div>
    </aside>
  )
}

export default TaskUI
