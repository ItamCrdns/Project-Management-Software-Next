import styles from './tasks.module.css'
import ProjectUI from './ProjectUI'
import TasksUI from './TasksUI'
import { taskSortValues } from '@/app/dashboard/@admin/@tasks/sortValues'
import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import DataHeader from '@/components/Data Header/DataHeader'

interface ProjectTasksProps {
  params: { projectId: string }
  searchParams: SearchParamsPageSize
}

const ProjectTasks: React.FC<ProjectTasksProps> = (props) => {
  return (
    <section className={styles.mainwrapper}>
      <div>
        <div className={styles.headerwrapper}>
          <DataHeader
            dashboard={false}
            entity='tasks'
            width='300px'
            sortValues={taskSortValues}
            pushSearchParams
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
