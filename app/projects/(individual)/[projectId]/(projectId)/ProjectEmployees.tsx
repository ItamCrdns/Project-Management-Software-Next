import styles from './project.module.css'
import Link from 'next/link'
import { type Employee } from '@/interfaces/employee'
import EmployeeOfTheList from '@/components/Generic Entity Renderer/EmployeeOfTheList'
import { type Position } from '@/components/Generic Entity Renderer/IEmployeeListProps'

interface ProjectEmployeeProps {
  employees: Employee[]
  projectId: number
  employeeCount: number
}

const ProjectEmployees: React.FC<ProjectEmployeeProps> = (props) => {
  const { employees, projectId, employeeCount } = props

  const position: Position = {
    top: '-1.5rem',
    right: '11.25rem'
  }

  return (
    <section className={styles.employees}>
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
        {employees.map((employee: Employee, index: number) => (
          <div key={index} className={styles.employeeslist}>
            <EmployeeOfTheList
              employee={employee}
              size={50}
              redirectMe={false}
              position={position}
            />
            <Link href={`/employees/${employee.username}`}>
              {employee.username}
            </Link>
          </div>
        ))}
      </ul>
      {employeeCount > 5 && (
        <h3>
          <Link href={`/projects/${projectId}/employees`}>
            See all {employeeCount} employees
          </Link>
        </h3>
      )}
    </section>
  )
}

export default ProjectEmployees
