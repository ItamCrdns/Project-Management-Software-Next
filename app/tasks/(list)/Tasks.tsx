import getTasks from '@/api-calls/getTasks'
import EachTask from '@/app/projects/(individual)/[projectId]/(projectId)/@tasks/EachTask'
import { type Task } from '@/interfaces/task'
import React from 'react'
import styles from '@/app/projects/(list)/projectslist.module.css'

const Tasks: React.FC = async () => {
  const { data } = await getTasks({
    page: 1,
    pageSize: 10,
    projectsPage: 1,
    projectsPageSize: 10
  })

  const tasks = data?.data ?? []

  return (
    <>
      {Array.isArray(tasks) && tasks.length > 0 && (
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <h2>{task.projectName}</h2>
              <div className={styles.projectswrapper}>
                <ul>
                  {task.tasks.map((task: Task, index: number) => (
                    <li key={index}>
                      <EachTask task={task} showProjectName={false} />
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default Tasks
