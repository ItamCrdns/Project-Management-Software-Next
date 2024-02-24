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
    <section className='flex items-center flex-col text-sm p-8 shadow-md gap-4 bg-theming-white100 dark:bg-theming-dark300'>
      <div className='flex items-center gap-8 justify-between border-b-2 border-azure-radiance-200 pb-2'>
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
          <div
            key={index}
            className='relative flex items-center justify-center flex-row gap-4'
          >
            <EmployeeOfTheList
              employee={employee}
              size={50}
              redirectMe={false}
              position={position}
            />
            <Link
              className='capitalize font-semibold text-base text-theming-dark100 dark:text-theming-white100'
              href={`/employees/${employee.username}`}
            >
              {employee.username}
            </Link>
          </div>
        ))}
      </ul>
      {employeeCount > 5 && (
        <h3>
          <Link
            className='text-theming-dark100 dark:text-theming-white100'
            href={`/projects/${projectId}/employees`}
          >
            See all {employeeCount} employees
          </Link>
        </h3>
      )}
    </section>
  )
}

export default ProjectEmployees
