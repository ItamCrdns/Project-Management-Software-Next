import { type Task } from '@/interfaces/task'
import getProjectTasks from '@/api-calls/getProjectTasks'
import EachTask from './EachTask'
import { type IFilterProperties } from '@/interfaces/props/context props/IFilter'
import { projectSortValues } from '@/components/Data Header/sortValues'
import DataHeader from '@/components/Data Header/DataHeader'
import { Button } from '@/components/Button/Button'

interface TasksProps {
  params: { projectId: string }
}

const TasksParallel: React.FC<TasksProps> = async (props) => {
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
    <section className='flex items-center justify-center text-sm gap-4'>
      <section>
        <div className='flex items-center justify-between mb-8'>
          <h1 className='font-semibold text-xl'>Tasks</h1>
          <div>
            <Button
              text='Show all tasks'
              href={`/projects/${projectId}/tasks`}
            />
          </div>
        </div>
        <DataHeader
          dashboard={false}
          width='300px'
          pushSearchParams={false}
          sortValues={projectSortValues} // TODO: FIX WRONG
        />
        {Array.isArray(tasks) && (
          <ul className='space-y-4 items-stretch'>
            {tasks.length > 0 &&
              tasks.map((task: Task, index: number) => (
                <li
                  className='relative flex items-center justify-center flex-row rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'
                  key={index}
                >
                  <EachTask task={task} showProjectName={false} />
                </li>
              ))}
          </ul>
        )}
      </section>
    </section>
  )
}

export default TasksParallel
