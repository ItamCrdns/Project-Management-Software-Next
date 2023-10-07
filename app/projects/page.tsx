import { type Project } from '@/interfaces/project'
import getProjects from '@/api-calls/getProjects'
import styles from './projectslist.module.css'
import Link from 'next/link'
import LoggedInCard from './LoggedInCard'
import Image from 'next/image'
import { relativeTime } from '@/utility/relativeTime'

interface SearchParams {
  page: string
  number: string
}
interface SearchParamsProps {
  searchParams: SearchParams
}

const ProjectsPage = async ({
  searchParams
}: SearchParamsProps): Promise<JSX.Element> => {
  const { page } = searchParams
  const data = await getProjects(page ?? '1', '5')
  const projects = data?.data as Project

  return (
    <main className={styles.main}>
      <section className={styles.projectswrapper}>
        <div className={styles.titlewrapper}>
          <span>
            <span className="material-symbols-outlined">tactic</span>
            <h1>All projects</h1>
          </span>
          <LoggedInCard />
        </div>
        <header className={styles.descriptor}>
          <span style={{ width: '300px', justifyContent: 'center' }}>
            <span className="material-symbols-outlined">signature</span>
            Name
          </span>
          <span style={{ width: '300px', justifyContent: 'center' }}>
            <span className="material-symbols-outlined">person</span>
            Creator
          </span>
          <span style={{ width: '300px', justifyContent: 'center' }}>
            <span className="material-symbols-outlined">group</span>
            Employees
          </span>
          <span style={{ width: '300px', justifyContent: 'center' }}>
            <span className="material-symbols-outlined">priority_high</span>
            Priority
          </span>
          <span style={{ width: '300px', justifyContent: 'center' }}>
            <span className="material-symbols-outlined">calendar_month</span>
            Created
          </span>
        </header>
        {Array.isArray(projects) && (
          <ul>
            {projects?.map((project: Project) => (
              <li key={project.projectId}>
                <div>
                  {/* Project names */}
                  <h1>
                    <Link href={`/projects/${project.projectId}`}>
                      {project.name}
                    </Link>
                  </h1>
                </div>
                <div>
                  {/* Project creator */}
                  <Image
                    src={project.projectCreator.profilePicture}
                    alt={project.projectCreator.username}
                    width={25}
                    height={25}
                  />
                  <p>{project.projectCreator.username}</p>
                </div>
                <div className={styles.listofemployees}>
                  {/* Project employees */}
                  {Array.isArray(project.employees) && (
                    <ul>
                      {project.employees.slice(0, 5).map((employee) => (
                        <li key={employee.employeeId}>
                          <Link href={`/employees/${employee.username}`}>
                            <Image
                              src={employee.profilePicture}
                              alt={employee.username}
                              width={25}
                              height={25}
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div>
                  {/* Project priority */}
                  <p>{project.priority}/5</p>
                </div>
                <div>
                  {/* Project priority */}
                  <p>{relativeTime(new Date(project.created ?? '').getTime())}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default ProjectsPage
