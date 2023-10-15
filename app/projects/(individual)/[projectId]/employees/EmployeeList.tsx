import Search from '@/components/search/search'
import { type Employee } from '@/interfaces/employee'
import styles from './employees.module.css'
import Image from 'next/image'
import Link from 'next/link'

interface EmployeeListProps {
  employeeList: Employee[]
  message: string
  getInputValue: (input: string) => void
}

const EmployeeList = ({
  employeeList,
  message,
  getInputValue
}: EmployeeListProps): JSX.Element => {
  return (
    <>
      {Array.isArray(employeeList) && (
        <>
          <h1>All employees</h1>
          <Search maxInputLength={16} onSearch={getInputValue} />
          {employeeList.length > 0
            ? (
            <ul>
              {employeeList.map((employee: Employee) => (
                <li key={employee.employeeId}>
                  <Link href={`/employees/${employee.username}`}>
                    <Image
                      src={employee.profilePicture}
                      alt={employee.username}
                      width={50}
                      height={50}
                    />
                  </Link>
                  <p>
                    <Link href={`/employees/${employee.username}`}>
                      {employee.username}
                    </Link>
                  </p>
                </li>
              ))}
            </ul>
              )
            : (
            <div className={styles.noemployeesfound}>
              <p>{message}</p>
            </div>
              )}
        </>
      )}
    </>
  )
}

export default EmployeeList
