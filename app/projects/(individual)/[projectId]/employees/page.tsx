import getProjectEmployees from '@/api-calls/getEmployeeProjects'
import { type Employee } from '@/interfaces/employee'
import styles from './employees.module.css'
import Link from 'next/link'
import Image from 'next/image'

interface EmployeeProps {
  params: { projectId: string }
}

const EmployeesList = async ({
  params
}: EmployeeProps): Promise<JSX.Element> => {
  const { data } = await getProjectEmployees(params.projectId, '1', '5')

  const employees = data as Employee[]

  return (
    <section className={styles.employeeswrapper}>
      <section className={styles.employees}>
        <Link
          href={`/projects/${params.projectId}`}
          className={`material-symbols-outlined ${styles.closebutton}`}
        >
          close
        </Link>
        {Array.isArray(employees) && employees.length > 0 && (
          <>
            <h1>All employees</h1>
            <ul>
              {employees.map((employee: Employee) => (
                <li key={employee.employeeId}>
                  <Image
                    src={employee.profilePicture}
                    alt={employee.username}
                    width={50}
                    height={50}
                  />
                  <p>{employee.username}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </section>
  )
}

export default EmployeesList
