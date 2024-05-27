import { TeamAndCreator } from '../TeamAndCreator'
import { type TaskUIProps } from './TaskUI.interface'
import { EntityNotFound } from '../EntityNotFound'
import TaskUI from './TaskUI'

const TaskUITeamAndCreator: React.FC<TaskUIProps> = (props) => {
  const { task, employeeCountHref, noTask } = props

  if (noTask) {
    return <EntityNotFound entity='Task' />
  }

  return (
    <aside className='flex flex-col items-center gap-8'>
      <div className='flex flex-col gap-8 w-[400px]'>
        <div className='w-full space-y-2'>
          {task?.entity && <TaskUI task={task?.entity} />}
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

export default TaskUITeamAndCreator
