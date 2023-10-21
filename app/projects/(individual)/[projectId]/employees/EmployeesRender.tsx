import Link from 'next/link'
import EmployeeList from './EmployeeList'
import ServerPagination from '@/components/pagination/ServerPagination'
import styles from './employees.module.css'
import { type Employee } from '@/interfaces/employee'
import { type SearchParams } from '@/interfaces/searchParams'
import { useState } from 'react'

interface EmployeesRenderProps {
  projectId: string
  employeeList: Employee[]
  message: string
  searchValue: string
  totalPages: number
  handlePageChange: (page: number) => void
  getInputValue: (input: string) => void
  searchParams: SearchParams
  pathname: string
}

const EmployeesRender: React.FunctionComponent<EmployeesRenderProps> = ({
  projectId,
  employeeList,
  message,
  searchValue,
  totalPages,
  searchParams,
  handlePageChange,
  getInputValue,
  pathname
}) => {
  const page = searchParams.page

  // Get the key of the page from the searchParams object
  const pageKey = Object.keys(searchParams).find((key) => key === 'page')

  const urlWithParams = `${pathname}?${pageKey}=${page}`

  const [resetPage, setResetPage] = useState<boolean>(false)
  const handleInputChange = (value: boolean): void => {
    setResetPage(value)
  }

  return (
    <section className={styles.employeeswrapper}>
      <section className={styles.employees}>
        <Link
          href={`/projects/${projectId}`}
          className={`material-symbols-outlined ${styles.closebutton}`}
        >
          close
        </Link>
        <EmployeeList
          onInputChange={handleInputChange}
          urlWithParams={urlWithParams}
          employeeList={employeeList}
          message={message}
          getInputValue={getInputValue}
        />
        <ServerPagination
          reset={resetPage}
          url={`/projects/${projectId}/employees`}
          totalPages={totalPages}
          pageFromSearchParams={page}
          onPageChange={handlePageChange}
        />
      </section>
    </section>
  )
}

export default EmployeesRender
