import { type Task } from '@/interfaces/task'
import styles from '@/app/projects/(list)/projectslist.module.css'
import taskstyles from './tasks.module.css'
import getProjectTasks from '@/api-calls/getProjectTasks'
import EachTask from './EachTask'
import RippleButton from '@/components/ripplebutton/RippleButton'
// import HeaderDescriptor from '@/app/projects/(list)/HeaderDescriptor'

interface TasksProps {
  params: { projectId: string }
}

const TasksParallel: React.FC<TasksProps> = async (props) => {
  const projectId = props.params.projectId
  const { data } = await getProjectTasks(projectId, '1', '5')

  const tasks = data?.entity.data

  const isProjectParticipant = data?.isProjectParticipant ?? false
  const isProjectOwner = data?.isProjectOwner ?? false

  return (
    <section className={taskstyles.tasks}>
      <section className={styles.projectswrapper}>
        <div className={styles.companywrapper}>
          <h1>Tasks</h1>
          <div>
            <RippleButton
              text="Show all tasks"
              width="115px"
              backgroundColor="#80B3FF"
              textColor="white"
              href={`/projects/${projectId}/tasks`}
            />
            {isProjectOwner && (
              <RippleButton text="Create new task" width="125px" />
            )}
            {isProjectParticipant && (
              <>
                <RippleButton text="My tasks" width="85px" />
                <RippleButton text="Request new task" width="125px" />
              </>
            )}
          </div>
        </div>
        {/* <HeaderDescriptor entity='tasks' dashboard={false} width='300px' /> */}
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
    </section>
  )
}

export default TasksParallel
