'use client'
import styles from './projectslist.module.css'
import bannerStyles from './userbanner.module.css'
import { type Employee } from '@/interfaces/employee'
import EmployeeOfTheList from './EmployeeOfTheList'

interface ProjectEmployeesProps {
  employees: Employee[]
}

const ProjectEmployees = ({
  employees
}: ProjectEmployeesProps): JSX.Element => {
  return (
    <div className={`${styles.listofemployees} ${bannerStyles.userwrapper}`}>
      {Array.isArray(employees) && (
        <ul>
          {employees.slice(0, 5).map((employee) => (
            <EmployeeOfTheList key={employee.username} employee={employee} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default ProjectEmployees
