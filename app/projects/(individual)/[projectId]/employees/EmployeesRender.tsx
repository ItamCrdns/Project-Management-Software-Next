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
  totalPages: number
  searchParams: SearchParams
  pathname: string
}

const EmployeesRender: React.FunctionComponent<EmployeesRenderProps> = ({
  projectId,
  employeeList,
  message,
  totalPages,
  searchParams,
  pathname
}) => {
  // Get the key of the page from the searchParams object
  const pageKey = Object.keys(searchParams).find((key) => key === 'page')

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
        />
        <ServerPagination
          reset={resetPage}
          url={`/projects/${projectId}/employees`}
          totalPages={totalPages}
          searchParams={searchParams}
        />
      </section>
    </section>
  )
}

export default EmployeesRender
