import getTasks, { type GetTasksProps } from '@/api-calls/getTasks'
import EachTask from '@/app/projects/(individual)/[projectId]/(projectId)/@tasks/EachTask'
import { type Task } from '@/interfaces/task'
import QueryParamsPagination from '@/components/Advanced query params based pagination/QueryParamsPagination'
import { type TasksProps } from './TaskProps'
import generateQueryParams from '@/app/projects/client/queryParams'
import {
  SecondEntityProps,
  type PaginationProps
} from '@/components/Advanced query params based pagination/IQueryParamsPaginationProps'
import { Button } from '@/components/Button/Button'

const Tasks: React.FC<TasksProps> = async (props) => {
  const cleanParams = generateQueryParams(props.searchParams)

  const params: GetTasksProps = {
    page: cleanParams.page ?? '1',
    pageSize: cleanParams.pageSize ?? '5',
    tasksPageSize: cleanParams.secondPageSize ?? '5'
  }

  const { data, status } = await getTasks(params)

  if (status !== 200 && data === null) {
    return (
      <h1 className='text-center text-2xl text-red-600'>
        Something went wrong <span className='font-semibold'>{status}</span>
      </h1>
    )
  }

  const tasks = data?.data ?? []

  const paginationProps: PaginationProps = {
    totalPages: data?.pages ?? 0,
    entityName: 'Projects',
    totalEntitesCount: data?.count ?? 0
  }

  const secondEntityProps: SecondEntityProps = {
    secondEntity: 'Tasks per project',
    secondEntityTotalCount: tasks[0].count,
    secondEntityTotalPages: tasks[0].pages
  }

  return (
    <>
      <QueryParamsPagination
        paginationProps={paginationProps}
        secondEntityProps={secondEntityProps}
      />
      {Array.isArray(tasks) && tasks.length > 0 && (
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <div className='flex items-center justify-between'>
                <h1 className='m-0 my-6 text-xl font-semibold'>
                  {task.projectName}
                </h1>
                <div className='flex gap-4'>
                  {task.isCurrentUserOwner && (
                    <Button
                      text='Create a new task'
                      href={`projects/${task.projectId}/tasks/create`}
                    />
                  )}
                  {task.isCurrentUserInTeam && (
                    <Button
                      text='Your assigned tasks'
                      href={`projects/${task.projectId}/tasks`}
                    />
                  )}
                  <Button
                    text={`More tasks from ${task.projectName}`}
                    href={`projects/${task.projectId}/tasks`}
                  />
                </div>
              </div>
              <ul className='flex flex-col gap-4 items-stretch'>
                {task.tasks.map((task: Task, index: number) => (
                  <li
                    className='relative flex items-center justify-center flex-row rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'
                    key={index}
                  >
                    <EachTask task={task} showProjectName={false} />
                  </li>
                ))}
                <p className='self-end'>
                  {task.count} total tasks for{' '}
                  <span className='font-bold'>{task.projectName}</span>
                </p>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default Tasks
