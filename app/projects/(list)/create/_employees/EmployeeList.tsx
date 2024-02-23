import { type Employee } from '@/interfaces/employee'
import Image from 'next/image'
import { type EmployeeListProps } from '@/interfaces/props/EmployeeListProps'
import NoPicture from '@/components/No profile picture/NoPicture'

const EmployeeList: React.FC<EmployeeListProps> = (props) => {
  const { employeeList, handleEmployeeClick, selectedEmployees, message } =
    props
  return (
    <ul>
      {Array.isArray(employeeList) && (
        <>
          {employeeList.length > 0
            ? (
                employeeList.map((employee: Employee) => (
              <li
                key={employee.username}
                onClick={() => {
                  handleEmployeeClick(employee)
                }}
              >
                <div className='flex items-center'>
                  {employee.profilePicture !== null
                    ? (
                    <Image
                      src={employee.profilePicture}
                      alt={employee.username}
                      width={50}
                      height={50}
                    />
                      )
                    : (
                    <NoPicture width='50px' height='50px' />
                      )}
                  <p>{employee.username}</p>
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
