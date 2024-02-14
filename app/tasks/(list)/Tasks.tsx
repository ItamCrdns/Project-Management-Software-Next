import getTasks, { type GetTasksProps } from '@/api-calls/getTasks'
import EachTask from '@/app/projects/(individual)/[projectId]/(projectId)/@tasks/EachTask'
import { type Task } from '@/interfaces/task'
import React from 'react'
import styles from '@/app/projects/(list)/projectslist.module.css'
import QueryParamsPagination from '@/components/Advanced query params based pagination/QueryParamsPagination'
import { type TasksProps } from './TaskProps'
import generateQueryParams from '@/app/projects/client/queryParams'
import { type PaginationProps } from '@/components/Advanced query params based pagination/IQueryParamsPaginationProps'

const Tasks: React.FC<TasksProps> = async (props) => {
  const cleanParams = generateQueryParams(props.searchParams)

  const params: GetTasksProps = {
    page: cleanParams.page ?? '1',
    pageSize: cleanParams.pageSize ?? '5'
  }

  const { data } = await getTasks(params)

  const tasks = data?.data ?? []

  const paginationProps: PaginationProps = {
    totalPages: data?.pages ?? 1,
    entityName: 'Tasks',
    totalEntitesCount: data?.count ?? 1
  }

  return (
    <>
      <QueryParamsPagination paginationProps={paginationProps} />
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
                  <p style={{ alignSelf: 'flex-end' }}>
                    Total{' '}
                    <span style={{ fontWeight: 'bold' }}>
                      {task.projectName}
                    </span>{' '}
                    tasks: {task.count}
                  </p>
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
