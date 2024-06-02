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
    <div className='flex flex-col items-center p-8 gap-2 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
      <h1 className='self-start font-semibold'>Task information</h1>
      <div className='flex gap-4 items-center'>
        <Link
          className='font-bold text-theming-dark100 dark:text-theming-white100'
          href={`/clients/${task.project.clientId}/projects/${task.project.projectId}/tasks/${task.taskId}`}
        >
          {task.name}
        </Link>
        {task.startedWorking !== null ? (
          <BadgeComponent
            content={`Started ${dateUtil(task.startedWorking).text}`}
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
        ) : (
          <BadgeComponent
            content='Not started'
            color='gray'
            tooltip='No one is working on this task yet'
          />
        )}
      </div>
      <div className='p-0 -mt-2 w-full'>
        <Dates
          created={task.created}
          expectedDelivery={task.expectedDeliveryDate}
          finalized={task.finished}
        />
      </div>
    </div>
  )
}

export default TaskUI
