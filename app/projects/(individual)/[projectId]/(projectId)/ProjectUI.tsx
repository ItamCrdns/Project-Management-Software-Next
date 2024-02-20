import { setEntityPriority } from '@/components/Generic Entity Renderer/EntityPriority'
import styles from './project.module.css'
import ProjectCreator from './ProjectCreator'
import ExpectedDeliveryDate from './ExpectedDeliveryDate'
import { getRelativeTimeString } from '@/utility/relativeTime'
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

  const projectCreatedAt = getRelativeTimeString(project?.created ?? '')

  return (
    <section className={styles.contentwrapper}>
      {props.children}
      <div className={styles.projectwrapper}>
        <div className={styles.project}>
          <div className='flex items-center gap-8 justify-between border-b-2 border-azure-radiance-200 pb-2'>
            <h1 className='text-2xl font-semibold'>{project?.name}</h1>
            <h3 className='font-medium'>
              <span className={styles.grayedtext}>Company: </span>
              {company.name}
            </h3>
          </div>
          <div className={styles.projectcontainer}>
            <section className='max-w-md mt-4'>
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
            <aside className='p-4 max-w-xs flex flex-col gap-4 border-l-2 border-azure-radiance-200'>
              <div>
                <p className={styles.grayedtext}>Priority</p>
                <p style={{ color: priority.color }}>{priority.priorityText}</p>
              </div>
              <div>
                <p className={styles.grayedtext}>Created by</p>
                <ProjectCreator creator={projectCreator} showUsername />
              </div>
              <div>
                <p className={styles.grayedtext}>Status</p>
                <p>{project?.lifecycle}</p>
              </div>
              <div>
                <p className={styles.grayedtext}>Date</p>
                <p>Created {projectCreatedAt}</p>
              </div>
              <ExpectedDeliveryDate project={project as Project} />
            </aside>
          </div>
        </div>
        {Array.isArray(employees) && employees.length > 0 && (
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
