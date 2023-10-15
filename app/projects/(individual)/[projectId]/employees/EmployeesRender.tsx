import Link from 'next/link'
import EmployeeList from './EmployeeList'
import Pagination from '@/components/pagination/pagination'
import styles from './employees.module.css'
import { type Employee } from '@/interfaces/employee'

interface EmployeesRenderProps {
  projectId: string
  employeeList: Employee[]
  message: string
  searchValue: string
  totalPages: number
  handlePageChange: (page: number) => void
  getInputValue: (input: string) => void
}

const EmployeesRender: React.FunctionComponent<EmployeesRenderProps> = ({
  projectId,
  employeeList,
  message,
  searchValue,
  totalPages,
  handlePageChange,
  getInputValue
}) => {
  // * Reset the page to 1 when the user searches for something
  const resetPage = searchValue !== ''
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
          employeeList={employeeList}
          message={message}
          getInputValue={getInputValue}
        />
        <Pagination
          reset={resetPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </section>
  )
}

export default EmployeesRender
