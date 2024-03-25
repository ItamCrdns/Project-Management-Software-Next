import { type Task } from '@/interfaces/task'
import getProjectTasks from '@/api-calls/getProjectTasks'
import EachTask from './EachTask'
import { type IFilterProperties } from '@/interfaces/props/context props/IFilter'
import DataHeader from '@/components/Data Header/DataHeader'
import { Button } from '@/components/Button/Button'
import { taskSortValues } from '@/app/dashboard/@admin/@tasks/sortValues'
import { TasksDivider } from './TasksDivider'
import { ArrowRightCircle } from '@/svg/ArrowRightCircle'

const TasksParallel: React.FC<{ params: { projectId: string } }> = async (
  props
) => {
  const projectId = props.params.projectId

  const queryParams: IFilterProperties = {
    page: '1',
    pageSize: '5',
    orderBy: 'Name', // ! Placeholder orderBy and sort. Might not change them idk
    sort: 'ascending'
  }

  const { data } = await getProjectTasks(projectId, queryParams)

  const tasks = data?.entity.data

  return (
    <section className='flex flex-col items-center justify-center'>
      <TasksDivider />
      <DataHeader
        dashboard={false}
        width='300px'
        pushSearchParams={false}
        sortValues={taskSortValues}
      />
      {Array.isArray(tasks) && tasks.length > 0 && (
        <div className='space-y-4 flex flex-col'>
          <ul className='space-y-4 items-stretch'>
            {tasks.map((task: Task, index: number) => (
              <li
                className='relative flex items-center justify-center flex-row rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'
                key={index}
              >
                <EachTask task={task} showProjectName={false} />
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
              href={`/projects/${projectId}/tasks`}
              icon={<ArrowRightCircle />}
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default TasksParallel
