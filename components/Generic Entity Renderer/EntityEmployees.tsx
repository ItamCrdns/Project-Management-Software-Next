'use client'
import styles from '@/app/projects/(list)/projectslist.module.css'
import bannerStyles from '@/app/projects/(list)/userbanner.module.css'
import { type Employee } from '@/interfaces/employee'
import EmployeeOfTheList from './EmployeeOfTheList'

interface EntityEmployeesProps {
  employees: Employee[]
}

const EntityEmployees: React.FunctionComponent<EntityEmployeesProps> = ({
  employees
}) => {
  return (
    <div className={`${styles.listofemployees} ${bannerStyles.userwrapper}`}>
      {Array.isArray(employees) && (
        <ul>
          {employees.slice(0, 5).map((employee) => (
            <EmployeeOfTheList
              key={employee.username}
              employee={employee}
              size={50}
              redirectMe={true}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default EntityEmployees
