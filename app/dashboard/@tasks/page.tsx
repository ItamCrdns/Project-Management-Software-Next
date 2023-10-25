import getTasksShowcase from '@/api-calls/getTasksShowcase'
import EachBanner, { type Item } from '../GenericBanner'
import { type Task } from '@/interfaces/task'

const Tasks = async (): Promise<JSX.Element> => {
  const { data } = await getTasksShowcase('1', '5')
  const tasks = data?.data ?? []

  // Convert the tasks to item so the generic EachBanner read it
  const tasksAsItem: Item[] = tasks.map((task: Task) => ({
    id: task.taskId,
    name: task.name
  }))

  return (
    <EachBanner
      items={tasksAsItem}
      entityIcon="note_stack"
      entityName="Tasks"
    />
  )
}

export default Tasks
