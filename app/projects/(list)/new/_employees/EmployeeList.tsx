import { type Employee } from '@/interfaces/employee'
import Image from 'next/image'
import styles from '../newProject.module.css'

interface EmployeeListProps {
  employeeList: Employee[]
  selectedEmployees: Employee[] | null
  message: string
  handleEmployeeClick: (employee: Employee) => void
}

const EmployeeList = ({
  employeeList,
  selectedEmployees,
  message,
  handleEmployeeClick
}: EmployeeListProps): JSX.Element => {
  return (
    <ul>
      {Array.isArray(employeeList) && (
        <>
          {employeeList.length > 0
            ? (
                employeeList.map((employee: Employee) => (
              <li
                key={employee.username}
                onClick={() => {
                  handleEmployeeClick(employee)
                }}
              >
                <div>
                  <Image
                    src={employee.profilePicture}
                    alt={employee.username}
                    width={50}
                    height={50}
                  />
                  <p>{employee.username}</p>
                </div>
                <span
                  style={{ color: '#6499E9', userSelect: 'none' }}
                  className="material-symbols-outlined"
                >
                  {selectedEmployees !== null &&
                  selectedEmployees.includes(
                    selectedEmployees.find(
                      (e) => e.username === employee.username
                    ) ?? employee
                  )
                    ? 'radio_button_checked'
                    : 'radio_button_unchecked'}
                </span>
              </li>
                ))
              )
            : (
            <div className={styles.noemployeesfound}>
              <p>{message}</p>
            </div>
              )}
        </>
      )}
    </ul>
  )
}

export default EmployeeList
