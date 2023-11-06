import Link from 'next/link'
import EmployeeList from './EmployeeList'
import ServerPagination from '@/components/pagination/ServerPagination'
import styles from './employees.module.css'
import { type Employee } from '@/interfaces/employee'
import { type SearchParams } from '@/interfaces/searchParams'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface EmployeesRenderProps {
  employeeList: Employee[]
  message: string
  totalPages: number
  searchParams: SearchParams
  pathname: string
  closeButtonHref: string
  paginationUrl: string
  headerText: string
}

const EmployeesRender: React.FunctionComponent<EmployeesRenderProps> = ({
  employeeList,
  message,
  totalPages,
  searchParams,
  pathname,
  closeButtonHref,
  paginationUrl,
  headerText
}) => {
  // Get the key of the page from the searchParams object
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
    <section className={styles.employeeswrapper}>
      <section className={styles.employees}>
        <Link
          href={closeButtonHref}
          className={`material-symbols-outlined ${styles.closebutton}`}
        >
          close
        </Link>
        <EmployeeList
          headerText={headerText}
          onInputChange={handleInputChange}
          urlWithParams={urlWithParams}
          employeeList={employeeList}
          message={message}
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
