import getProjectTasks from '@/api-calls/getProjectTasks'
import styles from '@/app/projects/(list)/projectslist.module.css'
import tasksStyles from './tasks.module.css'
import { type Task } from '@/interfaces/task'
import EachTask from '../(projectId)/@tasks/EachTask'
import QueryParamsPagination from '@/components/Advanced query params based pagination/QueryParamsPagination'
import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import generateQueryParams from '@/app/projects/client/queryParams'

interface TasksUIProps {
  projectId: string
  searchParams: SearchParamsPageSize
}

const TasksUI: React.FC<TasksUIProps> = async (props) => {
  const projectId = props.projectId

  const queryParams = generateQueryParams(props.searchParams)

  const { data } = await getProjectTasks(projectId, queryParams)

  const tasks = data?.entity.data

  const totalPages = data?.entity.pages ?? 1
  const totalTasks = data?.entity.count ?? 1

  return (
    <section
      className={`${styles.projectswrapper} ${tasksStyles.taskswrapper}`}
    >
      <div className={tasksStyles.paginationwrapper}>
        <QueryParamsPagination
          url={`/projects/${props.projectId}/tasks`}
          totalPages={totalPages}
          searchParams={props.searchParams}
          entityName="Tasks"
          totalEntitesCount={totalTasks}
        />
      </div>
      {Array.isArray(tasks) && (
        <ul>
          {tasks.length > 0 &&
            tasks.map((task: Task, index: number) => (
              <li key={index}>
                <EachTask task={task} showProjectName={false} />
              </li>
            ))}
        </ul>
      )}
    </section>
  )
}

export default TasksUI
