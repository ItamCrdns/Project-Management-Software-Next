import Search from '@/components/search/search'
import { type Employee } from '@/interfaces/employee'
import styles from './employees.module.css'
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

const EmployeeList: React.FunctionComponent<EmployeeListProps> = (props) => {
  const { employeeList, message, headerText, onInputChange, urlWithParams } =
    props

  return (
    <>
      {Array.isArray(employeeList) && (
        <>
          <h1>{headerText}</h1>
          <Search
            stateBasedSearch={false}
            onInputChange={onInputChange}
            maxInputLength={16}
            url={urlWithParams}
          />
          {employeeList.length > 0
            ? (
            <ul>
              {employeeList.map((employee: Employee) => (
                <li key={employee.employeeId}>
                  <Link href={`/employees/${employee.username}`}>
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
