import Search from '@/components/search/search'
import { type Employee } from '@/interfaces/employee'
import Link from 'next/link'
import Image from 'next/image'
import NoPicture from '@/components/No profile picture/NoPicture'

interface EmployeeListProps {
  employeeList: Employee[]
  message: string
  headerText: string
  onInputChange: (arg0: boolean) => void
  urlWithParams: string
}

const EmployeeList: React.FC<EmployeeListProps> = (props) => {
  const { employeeList, message, headerText, onInputChange, urlWithParams } =
    props

  return (
    Array.isArray(employeeList) && (
      <>
        <h1 className='text-2xl m-0'>{headerText}</h1>
        <Search
          stateBasedSearch={false}
          onInputChange={onInputChange}
          maxInputLength={16}
          url={urlWithParams}
        />
        {employeeList.length > 0
          ? (
          <ul className='list-none m-0 p-4 rounded-md w-full h-72 bg-theming-darkerbannerflex items-center flex-col bg-theming-white200 dark:bg-theming-dark200'>
            {employeeList.map((employee: Employee) => (
              <li
                className='flex items-center gap-4 py-1'
                key={employee.employeeId}
              >
                <Link href={`/employees/${employee.username}`}>
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
                </Link>
                <Link
                  className='font-medium text-black dark:text-white'
                  href={`/employees/${employee.username}`}
                >
                  {employee.username}
                </Link>
              </li>
            ))}
          </ul>
            )
          : (
          <div className='flex items-center justify-center text-center bg-theming-white200 dark:bg-theming-dark200 w-full h-72 rounded-md'>
            <p className='w-40'>{message}</p>
          </div>
            )}
      </>
    )
  )
}

export default EmployeeList
