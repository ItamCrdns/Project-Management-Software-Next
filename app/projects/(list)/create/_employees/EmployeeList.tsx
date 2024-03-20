import { type Employee } from '@/interfaces/employee'
import Image from 'next/image'
import { type EmployeeListProps } from '@/interfaces/props/EmployeeListProps'
import NoPicture from '@/components/No profile picture/NoPicture'

const EmployeeList: React.FC<EmployeeListProps> = (props) => {
  const { employeeList, handleEmployeeClick, selectedEmployees } = props

  const contrastSelectedEmployee = (
    employee: Employee,
    isDark: boolean
  ): string => {
    if (Array.isArray(selectedEmployees)) {
      return selectedEmployees.some((e) => e.username === employee.username)
        ? isDark
          ? 'dark-tremor-background-muted font-semibold'
          : 'tremor-background-muted font-semibold'
        : ''
    } else {
      return ''
    }
  }

  return (
    <ul className='flex-col h-80 justify-center mt-4 gap-2 box-border resize-none text-lg overflow-hidden min-w-full p-4 flex items-center outline-none rounded-tremor-default transition duration-100 border shadow-tremor-input dark:shadow-dark-tremor-input bg-tremor-background dark:bg-dark-tremor-background text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis border-tremor-border dark:border-dark-tremor-border'>
      {props.isLoading && (
        <div className='flex gap-4 items-center'>
          <span className='h-4 w-4 animate-spin-fast rounded-full border-t-2 border-theming-dark100 dark:border-theming-white100'></span>
          <p className='text-xs'>Loading...</p>
        </div>
      )}
      {Array.isArray(employeeList) &&
        (employeeList.length > 0
          ? employeeList.map((employee: Employee) => (
              <li
                className={`bg-${contrastSelectedEmployee(
                  employee,
                  false
                )} dark:bg-${contrastSelectedEmployee(
                  employee,
                  true
                )} w-full py-2 flex items-center justify-center gap-8 cursor-pointer hover:bg-tremor-background-muted hover:opacity-50 dark:hover:bg-dark-tremor-background-muted dark:hover:opacity-50`}
                key={employee.username}
                onClick={() => {
                  handleEmployeeClick(employee)
                }}
              >
                <div className='flex items-center gap-4'>
                  {employee.profilePicture !== null
                    ? (
                    <Image
                      src={employee.profilePicture}
                      alt={employee.username}
                      width={40}
                      height={40}
                      className='rounded-full'
                    />
                      )
                    : (
                    <NoPicture width='50px' height='50px' />
                      )}
                  <p className='text-sm w-28'>{employee.username}</p>
                </div>
                {selectedEmployees !== null &&
                selectedEmployees.includes(
                  selectedEmployees.find(
                    (x) => x.username === employee.username
                  ) ?? employee
                )
                  ? (
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
                      d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                    />
                  </svg>
                    )
                  : (
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
                      d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                    />
                  </svg>
                    )}
              </li>
          ))
          : !props.isLoading && ( // * Avoids showing the message when loading
              <p className='w-44 text-sm text-center p-4'>
                No employees match your search criteria.
              </p>
            ))}
    </ul>
  )
}

export default EmployeeList
