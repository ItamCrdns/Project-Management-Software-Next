import Search from '@/components/search/search'
import { type Employee } from '@/interfaces/employee'
import Link from 'next/link'
import Image from 'next/image'
import NoPicture from '@/components/No profile picture/NoPicture'

interface EmployeeListProps {
  employeeList: Employee[]
  headerText: string
  onInputChange: (arg0: boolean) => void
  urlWithParams: string
  isLoading: boolean
}

const EmployeeList: React.FC<EmployeeListProps> = (props) => {
  const { employeeList, headerText, onInputChange, urlWithParams } = props

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
        <ul className='w-full mt-4 p-8 rounded-md flex flex-col gap-4 justify-center items-center bg-theming-white200 dark:bg-theming-dark200 h-500'>
          {props.isLoading && (
            <>
              <span className='h-6 w-6 animate-spin-fast rounded-full border-t-2 border-theming-dark100 dark:border-theming-white100'></span>
              <p>Loading...</p>
            </>
          )}
          {employeeList.length > 0
            ? employeeList.map((employee: Employee) => (
                <li
                  className='w-full flex gap-4 items-center justify-between cursor-pointer hover:bg-theming-white100 dark:hover:bg-theming-dark300 px-4 py-2 rounded-md select-none'
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
            ))
            : !props.isLoading && (
                <div className='flex items-center justify-center text-center bg-theming-white200 dark:bg-theming-dark200 w-full h-72 rounded-md'>
                  <p className='w-40'>
                    No employees match your search criteria.
                  </p>
                </div>
              )}
        </ul>
      </>
    )
  )
}

export default EmployeeList
