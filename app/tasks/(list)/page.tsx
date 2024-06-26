import Tasks from './Tasks'
import { type TasksProps } from './TaskProps'
import DataHeader from '@/components/Data Header/DataHeader'
import { Suspense } from 'react'
import { LoadingTasksSkeleton } from './LoadingTasksSkeleton'
import TasksHint from './TasksHint'
import { cookies } from 'next/headers'
import { taskSortValues } from '@/components/Data Header/sortValues'

const TasksPage: React.FC<TasksProps> = (props) => {
  const key =
    props.searchParams.page +
    props.searchParams.pagesize +
    props.searchParams.secondpagesize

  const configCookie = cookies().get('config')?.value

  return (
    <main className='flex flex-col justify-center gap-8 rounded-md p-8'>
      <h1 className='text-xl font-semibold text-center'>Tasks overview</h1>
      <section className='flex flex-col items-center justify-center'>
        <div className='flex flex-col'>
          <TasksHint config={configCookie} />
          <div className='space-y-8'>
            <DataHeader
              width='300px'
              pushSearchParams={false}
              sortValues={taskSortValues}
            />
            <Suspense
              key={key}
              fallback={
                <LoadingTasksSkeleton
                  projectsSkeletonsCount={Number(props.searchParams.pagesize)}
                  tasksSkeletonsCount={Number(
                    props.searchParams.secondpagesize
                  )}
                />
              }
            >
              <Tasks searchParams={props.searchParams} />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  )
}

export default TasksPage
