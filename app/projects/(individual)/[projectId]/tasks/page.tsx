import getProject from '@/api-calls/getProject'
import styles from './tasks.module.css'
import { type Employee } from '@/interfaces/employee'
import EmployeeOfTheList, {
  type Position
} from '@/components/Generic Entity Renderer/EmployeeOfTheList'
import ProjectCreator from '../(projectId)/ProjectCreator'

interface ProjectTasksProps {
  params: { projectId: string }
}

const ProjectTasks: React.FC<ProjectTasksProps> = async (props) => {
  const { data } = await getProject(props.params.projectId)

  const project = data?.entity

  const creatorPicturePosition: Position = {
    top: '1.75rem',
    right: '0rem'
  }

  return (
    <section className={styles.mainwrapper}>
      <div className={styles.entity}>
        <h1>{project?.name}</h1>
        <div className={styles.employeeswrapper}>
          <ProjectCreator
            creator={project?.creator as Employee}
            pictureSize={35}
            showUsername={false}
            position={creatorPicturePosition}
          />
          <span></span>
          <ul>
            {project?.team.map((employee: Employee, index: number) => (
              <div key={index} style={{ position: 'relative' }}>
                <EmployeeOfTheList
                  employee={employee}
                  size={35}
                  redirectMe={false}
                />
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.entity}>Tasks</div>
    </section>
  )
}

export default ProjectTasks
