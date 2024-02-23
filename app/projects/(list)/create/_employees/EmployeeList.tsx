import { type Employee } from '@/interfaces/employee'
import Image from 'next/image'
import { type EmployeeListProps } from '@/interfaces/props/EmployeeListProps'
import NoPicture from '@/components/No profile picture/NoPicture'

const EmployeeList: React.FC<EmployeeListProps> = (props) => {
  const { employeeList, handleEmployeeClick, selectedEmployees, message } =
    props

  const contrastSelectedEmployee = (
    employee: Employee,
    isDark: boolean
  ): string => {
    if (Array.isArray(selectedEmployees)) {
      return selectedEmployees.some((e) => e.username === employee.username)
        ? isDark
          ? 'dark200'
          : 'white100'
        : ''
    } else {
      return ''
    }
  }

  return (
    <ul className='mt-4 py-4 w-72 rounded-md flex flex-col gap-2 justify-center items-center bg-theming-white200 dark:bg-theming-dark300'>
      {Array.isArray(employeeList) && (
        <>
          {employeeList.length > 0
            ? (
                employeeList.map((employee: Employee) => (
              <li
                className={`bg-theming-${contrastSelectedEmployee(
                  employee,
                  false
                )} dark:bg-theming-${contrastSelectedEmployee(
                  employee,
                  true
                )} w-64 flex items-center gap-4 cursor-pointer hover:bg-theming-white100 dark:hover:bg-theming-dark200 p-2 rounded-md`}
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
              )
            : (
            <div className='p-4 rounded-md flex items-center justify-center'>
              <p className='text-center'>{message}</p>
            </div>
              )}
        </>
      )}
    </ul>
  )
}

export default EmployeeList
