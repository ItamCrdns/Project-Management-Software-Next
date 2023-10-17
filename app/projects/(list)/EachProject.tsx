import Link from 'next/link'
import { relativeTime } from '@/utility/relativeTime'
import ProjectCreator from './ProjectCreator'
import ProjectEmployees from './ProjectEmployees'
import ProjectPriority from './Priority'
import { type Project } from '@/interfaces/project'
import styles from './projectslist.module.css'

interface EachProjectProps {
  project: Project
}

const EachProject = ({ project }: EachProjectProps): JSX.Element => {
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
    </>
  )
}

export default EachProject
