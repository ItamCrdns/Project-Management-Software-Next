import { type Task } from '@/interfaces/task'
import getProjectTasks from '@/api-calls/getProjectTasks'
import EachTask from './EachTask'
import { type IFilterProperties } from '@/interfaces/props/context props/IFilter'
import { Button } from '@/components/Button/Button'
import { ArrowRightCircle } from '@/svg/ArrowRightCircle'
import { NotFound } from '@/components/404 Not Found/NotFound'

const TasksParallel: React.FC<{
  params: { clientId: string; projectId: string }
}> = async (props) => {
  const { clientId, projectId } = props.params

  const queryParams: IFilterProperties = {
    page: '1',
    pageSize: '5',
    orderBy: 'Created', // ! Placeholder orderBy and sort. Might not change them idk
    sort: 'descending'
  }

  const { data } = await getProjectTasks(projectId, queryParams)

  const noTasks = data?.entity.count === 0
  const isProjectOwner = data?.isProjectOwner ?? false

  if (noTasks) {
    if (isProjectOwner) {
      return (
        <NotFound
          text='No tasks found'
          buttonText='Create new task'
          href={`/clients/${clientId}/projects/${projectId}/tasks/create`}
        />
      )
    } else {
      return <NotFound text='No tasks found' />
    }
  }

  const tasks = data?.entity.data

  return (
    Array.isArray(tasks) &&
    tasks.length > 0 && (
      <div className='space-y-4 flex flex-col'>
        <ul className='space-y-4 items-stretch'>
          {tasks.map((task: Task, index: number) => (
            <li
              className='relative flex items-center justify-center flex-row rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'
              key={index}
            >
              <EachTask
                task={task}
                showProjectName={false}
                entityBasePath={`clients/${clientId}/projects/${props.params.projectId}/tasks`}
              />
            </li>
          ))}
        </ul>
        <p className='text-right text-xs'>
          Total {data?.entity.data?.[0]?.project?.name} tasks:{' '}
          {data?.entity.count}
        </p>
        <div className='flex self-end'>
          <Button
            text='All tasks'
            href={`/clients/${clientId}/projects/${projectId}/tasks`}
            icon={<ArrowRightCircle />}
          />
        </div>
      </div>
    )
  )
}

export default TasksParallel
