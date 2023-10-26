import Link from 'next/link'
import { relativeTime } from '@/utility/relativeTime'
import ProjectCreator from './ProjectCreator'
import ProjectEmployees from './ProjectEmployees'
import ProjectPriority from './Priority'
import { type Project } from '@/interfaces/project'
import styles from './projectslist.module.css'

interface EachProjectProps {
  project: Project
  showCompanyName: boolean // Used to track if the each project component should show the company name in one of its columns or not
  // ! If using showCompanyname, you should also set the "dashboard" property in the HeaderDescriptor to true
}

const EachProject: React.FunctionComponent<EachProjectProps> = ({
  project,
  showCompanyName
}) => {
  const companyName = project.company.name
  const companyId = project.company.companyId
  return (
    <>
      <div>
        <h1>
          <Link href={`/projects/${project.projectId}`}>{project.name}</Link>
        </h1>
      </div>
      <ProjectCreator creator={project.projectCreator} />
      {project.employees.length > 0
        ? (
        <ProjectEmployees employees={project.employees} />
          )
        : (
        <div className={styles.listofemployees}>No employees</div>
          )}
      <ProjectPriority priority={project.priority} />
      <div>
        <p>{relativeTime(new Date(project.created ?? '').getTime())}</p>
      </div>
      {showCompanyName && (
        <div>
          <h1 style={{ textAlign: 'center' }}>
            <Link href={`/projects/company/${companyId}/${companyName}`}>
              {companyName}
            </Link>
          </h1>
        </div>
      )}
    </>
  )
}

export default EachProject
