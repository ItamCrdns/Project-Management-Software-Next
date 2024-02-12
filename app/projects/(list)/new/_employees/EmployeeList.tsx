import { type Employee } from '@/interfaces/employee'
import Image from 'next/image'
import styles from '../newProject.module.css'
import { type EmployeeListProps } from '@/interfaces/props/EmployeeListProps'
import NoPicture from '@/components/No profile picture/NoPicture'

const EmployeeList: React.FC<EmployeeListProps> = (props) => {
  const { employeeList, handleEmployeeClick, selectedEmployees, message } =
    props
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
                  <p>{employee.username}</p>
                </div>
                <span
                  style={{ color: '#6499E9', userSelect: 'none' }}
                  className='material-symbols-outlined'
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
