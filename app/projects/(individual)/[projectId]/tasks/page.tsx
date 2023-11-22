import styles from './tasks.module.css'
import ProjectUI from './ProjectUI'
import TasksUI from './TasksUI'
import { taskSortValues } from '@/app/dashboard/@admin/@tasks/sortValues'
import HeaderDescriptor from '@/app/projects/(list)/HeaderDescriptor'
import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'

interface ProjectTasksProps {
  params: { projectId: string }
  searchParams: SearchParamsPageSize
}

const ProjectTasks: React.FC<ProjectTasksProps> = (props) => {
  const projectId = props.params.projectId

  const baseUrl = `/projects/${projectId}/tasks/`

  return (
    <section className={styles.mainwrapper}>
      <div>
        <div className={styles.headerwrapper}>
          <HeaderDescriptor
            dashboard={false}
            entity="tasks"
            width="300px"
            sortValues={taskSortValues}
            pushSearchParams
            url={baseUrl}
            searchParams={props.searchParams}
          />
        </div>
        <div className={styles.entitieswrapper}>
          <ProjectUI projectId={props.params.projectId} />
          <TasksUI
            projectId={props.params.projectId}
            searchParams={props.searchParams}
          />
        </div>
      </div>
    </section>
  )
}

export default ProjectTasks
