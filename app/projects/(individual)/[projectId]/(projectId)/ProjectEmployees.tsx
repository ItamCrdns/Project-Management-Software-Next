import Link from 'next/link'
import { type Employee } from '@/interfaces/employee'
import EmployeeOfTheList from '@/components/Generic Entity Renderer/EmployeeOfTheList'

interface ProjectEmployeeProps {
  employees: Employee[]
  projectId: number
  employeeCount: number
}

const ProjectEmployees: React.FC<ProjectEmployeeProps> = (props) => {
  const { employees, projectId, employeeCount } = props

  return (
    <section className='flex items-center rounded-md flex-col text-sm p-8 shadow-md gap-4 bg-theming-white100 dark:bg-theming-dark300'>
      <div className='flex items-center gap-8 justify-between border-b-2 border-azure-radiance-200 pb-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z'
          />
        </svg>
        <h1 className='text-2xl m-0'>Employee</h1>
        <h3 className='m-0'>List</h3>
      </div>
      <ul>
        {employees.map((employee: Employee, index: number) => (
          <div
            key={index}
            className='relative flex items-center justify-center flex-row gap-4'
          >
            <EmployeeOfTheList
              employee={employee}
              size={50}
              redirectMe={true}
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
