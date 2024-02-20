import getTasks, { type GetTasksProps } from '@/api-calls/getTasks'
import EachTask from '@/app/projects/(individual)/[projectId]/(projectId)/@tasks/EachTask'
import { type Task } from '@/interfaces/task'
import styles from '@/app/projects/(list)/projectslist.module.css'
import styles2 from './tasks.module.css'
import QueryParamsPagination from '@/components/Advanced query params based pagination/QueryParamsPagination'
import { type TasksProps } from './TaskProps'
import generateQueryParams from '@/app/projects/client/queryParams'
import { type PaginationProps } from '@/components/Advanced query params based pagination/IQueryParamsPaginationProps'
import { type SecondEntityProps } from '@/components/Advanced query params based pagination/IPaginationUIProps'
import RippleButton from '@/components/ripplebutton/RippleButton'

const Tasks: React.FC<TasksProps> = async (props) => {
  const cleanParams = generateQueryParams(props.searchParams)

  const params: GetTasksProps = {
    page: cleanParams.page ?? '1',
    pageSize: cleanParams.pageSize ?? '5',
    tasksPageSize: cleanParams.secondPageSize ?? '5'
  }

  const { data } = await getTasks(params)

  const tasks = data?.data ?? []

  const paginationProps: PaginationProps = {
    totalPages: data?.pages ?? 1,
    entityName: 'Projects',
    totalEntitesCount: data?.count ?? 1
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
              <div className={styles2.tasktitlewrapper}>
                <h1>{task.projectName}</h1>
                <div className={styles2.taskbtnswrapper}>
                  {task.isCurrentUserOwner && (
                    <RippleButton
                      text='Create a new task'
                      href={`projects/${task.projectId}/tasks/create`}
                      textColor='white'
                      backgroundColor='var(--blue)'
                    />
                  )}
                  {task.isCurrentUserInTeam && (
                    <RippleButton
                      text='Your assigned tasks'
                      href={`projects/${task.projectId}/tasks`}
                      textColor='white'
                      backgroundColor='var(--blue)'
                    />
                  )}
                  <RippleButton
                    text={`More tasks from ${task.projectName}`}
                    href={`projects/${task.projectId}/tasks`}
                  />
                </div>
              </div>
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
