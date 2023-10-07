import styles from '../employee.module.css'
import Image from 'next/image'
import Link from 'next/link'
import getEmployee from '@/api-calls/getEmployee'

const EmployeeCard = async ({
  params
}: {
  params: { username: string }
}): Promise<JSX.Element> => {
  const { username } = params
  const data = await getEmployee(username)
  const employee = data?.data
  const supervisor = employee?.supervisor

  return (
    <section className={styles.cardswrapper}>
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
            <p>{employee?.projectCount}</p> Projects
          </Link>
          <Link href={`/employees/${employee?.username}/tasks`}>
            <p>{employee?.taskCount}</p> Tasks
          </Link>
          <Link href={`/employees/${employee?.username}/issues`}>
            <p>{employee?.issueCount}</p> Issues
          </Link>
        </section>
      </section>
      {supervisor !== null && (
        <section className={styles.employeecard}>
          <h2>Supervisor</h2>
          <div className={styles.supervisorcontainer}>
            <Image
              src={supervisor?.profilePicture ?? ''}
              alt={supervisor?.username ?? ''}
              width={50}
              height={50}
            />
            <p>
              <Link href={`/employees/${supervisor?.username}`}>
                {supervisor?.username}
              </Link>
            </p>
          </div>
        </section>
      )}
    </section>
  )
}

export default EmployeeCard
