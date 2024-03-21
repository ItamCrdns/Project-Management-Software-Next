import React from 'react'
import { TeamAndCreator } from '../TeamAndCreator'
import { type TaskUIProps } from './TaskUI.interface'

const TaskUI: React.FC<TaskUIProps> = (props) => {
  const { task, employeeCountHref } = props

  return (
    <aside className='flex flex-col items-center gap-8'>
      <div className='flex flex-col gap-4 min-w-56'>
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
