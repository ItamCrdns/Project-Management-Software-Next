'use client'
import styles from '@/app/projects/(list)/projectslist.module.css'
import bannerStyles from '@/app/projects/(list)/userbanner.module.css'
import { type Employee } from '@/interfaces/employee'
import EmployeeOfTheList from './EmployeeOfTheList'
import { type Style } from './EntityRenderer'

interface EntityEmployeesProps {
  employees: Employee[]
  style: Style
}

const EntityEmployees: React.FunctionComponent<EntityEmployeesProps> = (
  props
) => {
  return (
    <div style={props.style} className={`${styles.listofemployees} ${bannerStyles.userwrapper}`}>
      {Array.isArray(props.employees) && (
        <ul>
          {props.employees.slice(0, 5).map((employee) => (
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
