import Search from '@/components/search/search'
import { type Employee } from '@/interfaces/employee'
import Link from 'next/link'
import Image from 'next/image'
import NoPicture from '@/components/No profile picture/NoPicture'

interface EmployeeListProps {
  employeeList: Employee[]
  headerText: string
  isLoading: boolean
}

const EmployeeList: React.FC<EmployeeListProps> = (props) => {
  const { employeeList, headerText } = props

  return (
    Array.isArray(employeeList) && (
      <div className='mt-6'>
        <h1 className='text-lg text-center font-semibold mb-4'>{headerText}</h1>
        <Search stateBasedSearch={false} maxInputLength={16} />
        <ul className='flex-col h-80 justify-center mt-4 gap-4 box-border resize-none text-lg overflow-hidden min-w-full p-4 flex items-center outline-none rounded-tremor-default transition duration-100 border shadow-tremor-input dark:shadow-dark-tremor-input bg-tremor-background dark:bg-dark-tremor-background text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis border-tremor-border dark:border-dark-tremor-border'>
          {props.isLoading && (
            <div className='flex gap-4 items-center'>
              <span className='h-4 w-4 animate-spin-fast rounded-full border-t-2 border-theming-dark100 dark:border-theming-white100'></span>
              <p className='text-xs'>Loading...</p>
            </div>
          )}
          {employeeList.length > 0
            ? employeeList.map((employee: Employee) => (
                <li
                  className='flex items-center gap-4'
                  key={employee.employeeId}
                >
                  <Link href={`/employee/${employee.username}`}>
                    {employee.profilePicture !== null ? (
                      <Image
                        src={employee.profilePicture}
                        alt={employee.username}
                        width={40}
                        height={40}
                        className='rounded-full'
                      />
                    ) : (
                      <NoPicture width='50px' height='50px' />
                    )}
                  </Link>
                  <Link
                    className='font-medium text-black dark:text-white text-base'
                    href={`/employee/${employee.username}`}
                  >
                    {employee.username}
                  </Link>
                </li>
              ))
            : !props.isLoading && (
                <p className='w-44 text-sm text-center p-4'>
                  No employees match your search criteria.
                </p>
              )}
        </ul>
      </div>
    )
  )
}

export default EmployeeList
