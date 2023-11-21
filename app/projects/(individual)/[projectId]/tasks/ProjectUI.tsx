import styles from './tasks.module.css'
import ProjectCreator from '../(projectId)/ProjectCreator'
import { type Employee } from '@/interfaces/employee'
import EmployeeOfTheList from '@/components/Generic Entity Renderer/EmployeeOfTheList'
import { type Position } from '@/components/Generic Entity Renderer/IEmployeeListProps'
import getProjectLimited from '@/api-calls/getProjectLimited'
import Link from 'next/link'
import EntityPriority from '@/components/Generic Entity Renderer/EntityPriority'
import RippleButton from '@/components/ripplebutton/RippleButton'

interface ProjectUIProps {
  projectId: string
}

const ProjectUI: React.FC<ProjectUIProps> = async (props) => {
  const { data } = await getProjectLimited(props.projectId)

  const project = data?.entity
  const projectCreator = project?.creator

  console.log(data)

  const creatorPicturePosition: Position = {
    top: '1rem',
    right: '4rem'
  }

  const teamPicturePosition: Position = {
    top: '2.5rem'
  }

  const isProjectParticipant = data?.isParticipant
  const isProjectOwner = data?.isOwner

  return (
    <aside className={styles.projectwrapper}>
      <div>
        <div className={styles.entity}>
          <h1 className={styles.header}>Project name</h1>
          <h1>
            <Link href={`/projects/${project?.projectId}`}>
              {project?.name}
            </Link>
          </h1>
          <div className={styles.entitybottomtext}>
            <p>{project?.lifecycle}</p>
            <p style={{ userSelect: 'none' }}>&middot;</p>
            <EntityPriority priority={project?.priority ?? 1} />
          </div>
        </div>
        <div className={styles.employeeswrapper}>
          <div className={`${styles.creatorwrapper} ${styles.banner}`}>
            <h1>Project creator</h1>
            <div>
              <ProjectCreator
                creator={projectCreator as Employee}
                pictureSize={75}
                showUsername={false}
                position={creatorPicturePosition}
              />
              <h3>
                <Link href={`/employees/${projectCreator?.username}`}>
                  {projectCreator?.username}
                </Link>
              </h3>
            </div>
          </div>
          <ul className={styles.banner}>
            <h1>Team</h1>
            {project?.team.map((employee: Employee, index: number) => (
              <div key={index} style={{ position: 'relative' }}>
                <EmployeeOfTheList
                  employee={employee}
                  size={35}
                  redirectMe={true}
                  position={teamPicturePosition}
                />
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.buttonswrapper}>
        {isProjectOwner === true && (
          <RippleButton text="Create new task" width="125px" />
        )}
        {isProjectParticipant === true && (
          <div className={styles.buttonswrapper}>
            <RippleButton text="My tasks" width="85px" />
            <RippleButton
              text="Request new task"
              width="130px"
              backgroundColor="#80B3FF"
            />
          </div>
        )}
      </div>
    </aside>
  )
}

export default ProjectUI
