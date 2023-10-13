import getProject from '@/api-calls/getProject'
import styles from './project.module.css'
import { type Images } from '@/interfaces/images'
import { relativeTime } from '@/utility/relativeTime'
import { type Employee } from '@/interfaces/employee'
import { type Company } from '@/interfaces/company'
import ProjectPriority from '../../(list)/Priority'
import Image from 'next/image'
import Link from 'next/link'

interface ProjectIdProps {
  projectId: string
}

const ProjectId = async ({
  params
}: {
  params: ProjectIdProps
}): Promise<JSX.Element> => {
  const { data } = await getProject(params.projectId)
  const project = data
  const images = project?.images as Images
  const employees = project?.employees as Employee[]
  const company = project?.company as Company
  const projectCreator = project?.projectCreator as Employee

  return (
    <article className={styles.projectwrapper}>
      <article className={styles.project}>
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
            <ProjectPriority priority={project?.priority ?? 0} />
            <p className={styles.grayedtext}>Created by</p>
            <div className={styles.userwrapper}>
              <Image
                src={projectCreator.profilePicture}
                alt={projectCreator.username}
                width={45}
                height={45}
              />
              <h3>
                <Link href={`/employees/${projectCreator.username}`}>
                  {projectCreator.username}
                </Link>
              </h3>
            </div>
            <p className={styles.grayedtext}>Status</p>
            <p>In progress</p>
            <p className={styles.grayedtext}>Date</p>
            <p>
              Created {relativeTime(new Date(project?.created ?? '').getTime())}
            </p>
          </aside>
        </div>
      </article>
      <article className={styles.employees}>
        <div className={styles.headerwrapper}>
          <h1>Employee</h1>
          <h3>List</h3>
        </div>
        {Array.isArray(employees) && (
          <ul>
            {employees.map((employee: Employee) => (
              <li key={employee.employeeId}>
                <Image
                  src={employee.profilePicture}
                  alt={employee.username}
                  width={50}
                  height={50}
                />
                <Link href={`/employees/${employee.username}`}>
                  {employee.username}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <h3>See all employees</h3>
      </article>
    </article>
  )
}

export default ProjectId
