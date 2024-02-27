'use client'
import { type Employee } from '@/interfaces/employee'
import { type Style } from './EntityRenderer'
import { IndividualEmployee } from './IndividualEmployee'

interface EntityEmployeesProps {
  employees: Employee[]
  style: Style
}

const EntityEmployees: React.FunctionComponent<EntityEmployeesProps> = (
  props
) => {
  return (
    <div style={props.style} className='flex items-center justify-center gap-2'>
      {Array.isArray(props.employees) && (
        <ul className='relative flex gap-2'>
          {props.employees.slice(0, 5).map((employee, index) => (
            <li key={index} className='relative'>
              <IndividualEmployee
                key={employee.username}
                employee={employee}
                size={35}
                redirectMe={true}
                showName={false}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default EntityEmployees
