import { setEntityPriority } from '@/components/Generic Entity Renderer/EntityPriority'
import styles from './project.module.css'
import ProjectCreator from './ProjectCreator'
import ExpectedDeliveryDate from './ExpectedDeliveryDate'
import { relativeTime } from '@/utility/relativeTime'
import ProjectEmployees from './ProjectEmployees'
import { type Project } from '@/interfaces/project'
import { type Images } from '@/interfaces/images'
import Image from 'next/image'
import { type ProjectUIProps } from './ProjectUIProps'

const ProjectUI: React.FC<ProjectUIProps> = (props) => {
  const {
    project,
    company,
    images,
    projectCreator,
    employees,
    projectId,
    employeeCount,
    tasksCount
  } = props

  const priority = setEntityPriority(project?.priority ?? 0)

  return (
    <section className={styles.contentwrapper}>
      {props.children}
      <div className={styles.projectwrapper}>
        <div className={styles.project}>
          <div className={styles.headerwrapper}>
            <h1>{project?.name}</h1>
            <h3>
              <span className={styles.grayedtext}>Company: </span>
              {company.name}
            </h3>
          </div>
          <div className={styles.projectcontainer}>
            <section className={styles.projectsidea}>
              <p className={styles.grayedtext}>Description</p>
              <p>{project?.description}</p>
              {Array.isArray(images) && (
                <ul>
                  {images.map((image: Images) => (
                    <li key={image.imageId}>
                      <Image
                        src={image.imageUrl}
                        alt={image.publicId}
                        width={125}
                        height={125}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </section>
            <aside className={styles.projectsideb}>
              <p className={styles.grayedtext}>Priority</p>
              <p style={{ color: priority.color }}>{priority.priorityText}</p>
              <p className={styles.grayedtext}>Created by</p>
              <ProjectCreator creator={projectCreator} showUsername />
              <p className={styles.grayedtext}>Status</p>
              <p>{project?.lifecycle}</p>
              <p className={styles.grayedtext}>Date</p>
              <p>
                Created{' '}
                {relativeTime(new Date(project?.created ?? '').getTime())}
              </p>
              <ExpectedDeliveryDate project={project as Project} />
            </aside>
          </div>
        </div>
        {Array.isArray(employees) && (
          <ProjectEmployees
            employees={employees}
            projectId={projectId}
            employeeCount={employeeCount}
          />
        )}
      </div>
      {tasksCount > 0 && props.tasks}
    </section>
  )
}

export default ProjectUI
