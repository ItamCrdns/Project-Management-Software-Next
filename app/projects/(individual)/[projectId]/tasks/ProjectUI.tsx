import styles from './tasks.module.css'
import ProjectCreator from '../(projectId)/ProjectCreator'
import { type Employee } from '@/interfaces/employee'
import EmployeeOfTheList from '@/components/Generic Entity Renderer/EmployeeOfTheList'
import { type Position } from '@/components/Generic Entity Renderer/IEmployeeListProps'
import getProjectLimited from '@/api-calls/getProjectLimited'

interface ProjectUIProps {
  projectId: string
}

const ProjectUI: React.FC<ProjectUIProps> = async (props) => {
  const { data } = await getProjectLimited(props.projectId)

  const project = data

  const creatorPicturePosition: Position = {
    top: '1rem',
    right: '4rem'
  }

  return (
    <aside className={styles.projectwrapper}>
      <div>
        <div className={styles.entity}>
          <h1>{project?.name}</h1>
        </div>
        <div className={styles.employeeswrapper}>
          <div className={`${styles.creatorwrapper} ${styles.banner}`}>
            <h1>Project creator</h1>
            <div>
              <ProjectCreator
                creator={project?.creator as Employee}
                pictureSize={75}
                showUsername={false}
                position={creatorPicturePosition}
              />
              <h3>{project?.creator.username}</h3>
            </div>
          </div>
          <ul className={styles.banner}>
            <h1>Team</h1>
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
    </aside>
  )
}

export default ProjectUI
