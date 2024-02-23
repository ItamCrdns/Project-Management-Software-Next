'use client'
import styles from '@/app/projects/(list)/projectslist.module.css'
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
    <div style={props.style} className={styles.listofemployees}>
      {Array.isArray(props.employees) && (
        <ul className='relative'>
          {props.employees.slice(0, 5).map((employee) => (
            <EmployeeOfTheList
              key={employee.username}
              employee={employee}
              size={35}
              redirectMe={true}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default EntityEmployees
