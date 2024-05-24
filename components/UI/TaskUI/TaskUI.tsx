import { Task } from '@/interfaces/task'
import Link from 'next/link'
import { BadgeComponent } from '../ProjectUI/BadgeComponent'
import { dateUtil } from '@/utility/dateUtil'
import { Dates } from '../ProjectUI/Badges/Dates'

const TaskUI = ({
  task
}: {
  task: Task
}) => {
  return (
    <div className='flex flex-col items-center p-4 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
      <div className='flex gap-4 items-center'>
        <Link
          className='font-bold text-theming-dark100 dark:text-theming-white100'
          href={`/clients/${task.project.clientId}/projects/${task.project.projectId}/tasks/${task.taskId}`}
        >
          {task.name}
        </Link>
        {task.startedWorking !== null && task.startedWorking !== undefined && (
          <BadgeComponent
            content={dateUtil(task.startedWorking).text}
            tooltip={new Date(task.startedWorking).toLocaleDateString('en-us', {
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
        created={task.created}
        expectedDelivery={task.expectedDeliveryDate}
        finalized={task.finished}
      />
    </div>
  )
}

export default TaskUI
