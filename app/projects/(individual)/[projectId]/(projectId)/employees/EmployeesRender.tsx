import Link from 'next/link'
import EmployeeList from './EmployeeList'
import ServerPagination from '@/components/pagination/ServerPagination'
import { type Employee } from '@/interfaces/employee'
import { type SearchParams } from '@/interfaces/searchParams'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface EmployeesRenderProps {
  employeeList: Employee[]
  totalPages: number
  searchParams: SearchParams
  pathname: string
  closeButtonHref: string
  paginationUrl: string
  headerText: string
  isLoading: boolean
}

const EmployeesRender: React.FC<EmployeesRenderProps> = (props) => {
  // Get the key of the page from the searchParams object
  const { employeeList, totalPages, searchParams, pathname, closeButtonHref, paginationUrl, headerText } = props

  const pageKey = Object.keys(searchParams).find((key) => key === 'page')

  const router = useRouter()
  useEffect(() => {
    if (totalPages !== 0 && parseInt(searchParams.page) > totalPages) {
      router.push(`${pathname}?${pageKey}=${1}`)
    }
  }, [searchParams.page, totalPages])

  const urlWithParams = `${pathname}?${pageKey}=${searchParams.page}`

  const [resetPage, setResetPage] = useState<boolean>(false)

  const handleInputChange = (value: boolean): void => {
    setResetPage(value)
    searchParams.page = '1'
  }

  return (
    <section className='fixed bg-black bg-opacity-20 w-full h-screen flex flex-col items-center justify-center z-10 m-0 p-0'>
      <section className='absolute top-8 flex items-center justify-center flex-col gap-4 min-h-96 bg-theming-white100 dark:bg-theming-dark300 p-8 rounded-lg shadow-md'>
        <Link className='text-black dark:text-white' href={closeButtonHref}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 absolute top-0 right-0 m-2 hover:text-azure-radiance-400 cursor-pointer'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18 18 6M6 6l12 12'
            />
          </svg>
        </Link>
        <EmployeeList
          headerText={headerText}
          onInputChange={handleInputChange}
          urlWithParams={urlWithParams}
          employeeList={employeeList}
          isLoading={props.isLoading}
        />
        <ServerPagination
          reset={resetPage}
          url={paginationUrl}
          totalPages={totalPages}
          searchParams={searchParams}
        />
      </section>
    </section>
  )
}

export default EmployeesRender
