import { type Employee } from '@/interfaces/employee'
import styles from './employee.module.css'
import Image from 'next/image'
import Link from 'next/link'

export interface EmployeeCardProps {
  employee: Employee | null
}

const EmployeeCard = ({ employee }: EmployeeCardProps): JSX.Element => {
  return (
    <section className={styles.employeecard}>
      {employee?.profilePicture !== null && (
        <Image
          src={employee?.profilePicture ?? ''}
          alt={employee?.username ?? ''}
          width={200}
          height={200}
        />
      )}
      <h1>{employee?.username}</h1>
      <p>{employee?.role}</p>
      <section className={styles.employeenumbers}>
        <Link href={`/employees/${employee?.username}/projects`}>
          <p>2</p> Projects
        </Link>
        <Link href={`/employees/${employee?.username}/tasks`}>
          <p>2</p> Tasks
        </Link>
        <Link href={`/employees/${employee?.username}/issues`}>
          <p>2</p> Issues
        </Link>
      </section>
    </section>
  )
}

export default EmployeeCard
