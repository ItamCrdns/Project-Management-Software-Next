import { type Task } from '@/interfaces/task'
import getProjectTasks from '@/api-calls/getProjectTasks'
import EachTask from './EachTask'
import { type IFilterProperties } from '@/interfaces/props/context props/IFilter'
import { projectSortValues } from '@/components/Data Header/sortValues'
import DataHeader from '@/components/Data Header/DataHeader'
import { Button } from '@/components/Button/Button'
import { Task as TaskIcon } from '@/svg/Task'

const TasksParallel: React.FC<{ params: { projectId: string } }> = async (
  props
) => {
  const projectId = props.params.projectId

  const queryParams: IFilterProperties = {
    page: '1',
    pageSize: '2',
    orderBy: 'Name', // ! Placeholder orderBy and sort. Might not change them idk
    sort: 'ascending'
  }

  const { data } = await getProjectTasks(projectId, queryParams)

  const tasks = data?.entity.data

  return (
    <section className='flex flex-col items-center justify-center'>
      <div className='flex items-center justify-center mb-8 w-full'>
        <div className='flex gap-2'>
          <h1 className='font-semibold'>Tasks</h1>
          <TaskIcon />
        </div>
      </div>
      <DataHeader
        dashboard={false}
        width='300px'
        pushSearchParams={false}
        sortValues={projectSortValues} // TODO: FIX WRONG
      />
      {Array.isArray(tasks) && tasks.length > 0 && (
        <div className='space-y-4'>
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
          <Button text='Show all tasks' href={`/projects/${projectId}/tasks`} />
        </div>
      )}
    </section>
  )
}

export default TasksParallel
