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
          ? 'dark300'
          : 'white100'
        : ''
    } else {
      return ''
    }
  }

  return (
    <ul className='mt-4 p-8 rounded-md flex flex-col gap-4 justify-center items-center bg-theming-white200 dark:bg-theming-dark200 h-500'>
      {props.isLoading && (
        <>
          <span className='h-6 w-6 animate-spin-fast rounded-full border-t-2 border-theming-dark100 dark:border-theming-white100'></span>
          <p>Loading...</p>
        </>
      )}
      {Array.isArray(employeeList) &&
        (employeeList.length > 0
          ? employeeList.map((employee: Employee) => (
              <li
                className={`bg-theming-${contrastSelectedEmployee(
                  employee,
                  false
                )} dark:bg-theming-${contrastSelectedEmployee(
                  employee,
                  true
                )} w-full flex items-center justify-between cursor-pointer hover:bg-theming-white100 dark:hover:bg-theming-dark300 px-4 py-2 rounded-md select-none`}
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
                      width={50}
                      height={50}
                      className='rounded-full'
                    />
                      )
                    : (
                    <NoPicture width='50px' height='50px' />
                      )}
                  <p className='font-semibold'>{employee.username}</p>
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
              <div className='p-4 rounded-md flex items-center justify-center'>
                <p className='text-center'>
                  No employees match your search criteria.
                </p>
              </div>
            ))}
    </ul>
  )
}

export default EmployeeList
