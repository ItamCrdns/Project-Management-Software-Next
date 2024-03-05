import Tasks from './Tasks'
import { type TasksProps } from './TaskProps'

const TasksPage: React.FC<TasksProps> = (props) => {
  return (
    <main className='flex flex-col justify-center gap-8 rounded-md p-8'>
      <h1 className='text-2xl'>Tasks overview</h1>
      <section className='flex flex-col items-center justify-center'>
        <Tasks searchParams={props.searchParams} />
      </section>
    </main>
  )
}

export default TasksPage
