import styles from './project.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { type Employee } from '@/interfaces/employee'

interface ProjectEmployeeProps {
  employees: Employee[]
  projectId: number
  employeeCount: number
}

const ProjectEmployees: React.FC<ProjectEmployeeProps> = (props) => {
  const { employees, projectId, employeeCount } = props

  return (
    <article className={styles.employees}>
      <div className={styles.headerwrapper}>
        <h1>Employee</h1>
        <h3>List</h3>
      </div>
      <ul
        style={{
          borderBottom:
            employeeCount > 5 ? '2px solid var(--background-color)' : ''
        }}
      >
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
      {employeeCount > 5 && (
        <h3>
          <Link href={`/projects/${projectId}/employees`}>
            See all {employeeCount} employees
          </Link>
        </h3>
      )}
    </article>
  )
}

export default ProjectEmployees
