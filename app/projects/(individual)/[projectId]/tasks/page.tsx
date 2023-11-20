import styles from './tasks.module.css'
import ProjectUI from './ProjectUI'
import TasksUI from './TasksUI'
import { taskSortValues } from '@/app/dashboard/@admin/@tasks/sortValues'
import HeaderDescriptor from '@/app/projects/(list)/HeaderDescriptor'

interface ProjectTasksProps {
  params: { projectId: string }
}

const ProjectTasks: React.FC<ProjectTasksProps> = (props) => {
  return (
    <section className={styles.mainwrapper}>
      <div>
        <div className={styles.headerwrapper}>
          <HeaderDescriptor
            dashboard={false}
            width="300px"
            entity="tasks"
            sortValues={taskSortValues}
          />
        </div>
        <div className={styles.entitieswrapper}>
          <ProjectUI projectId={props.params.projectId} />
          <TasksUI projectId={props.params.projectId} />
        </div>
      </div>
    </section>
  )
}

export default ProjectTasks
