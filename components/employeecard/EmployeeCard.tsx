import Link from 'next/link'
import Image from 'next/image'
import styles from '@/app/employees/[username]/employee.module.css'
import { type Employee } from '@/interfaces/employee'
import RippleButton from '../ripplebutton/RippleButton'

interface EmployeeCardProps {
  employee: Employee | null
  supervisor?: Employee | null | undefined
  isProfile: boolean // * Should we show the supervisor card too or not?
  // ! || used to track if the cardwill be diplayted in the profile, if yes: more properties will be dispalyed. If no: only a few will because its a modal card being displayed somewhere in the page
  redirectMe: boolean // * Should we redirect to the employee profile or not?
}

const EmployeeCard = ({
  employee,
  supervisor,
  isProfile,
  redirectMe
}: EmployeeCardProps): JSX.Element => {
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
        {isProfile
          ? (
          <h1>{employee?.username}</h1>
            )
          : redirectMe
            ? (
          <h1 style={{ marginBottom: '1rem' }}>
            <Link href={`/employees/${employee?.username}`}>
              {employee?.username}
            </Link>
          </h1>
              )
            : (
          <h1 style={{ fontSize: '24px', marginBottom: '1rem' }}>
            {employee?.username}
          </h1>
              )}
        <p>{employee?.role}</p>
        {isProfile && (
          <section className={styles.employeenumbers}>
            <Link href={`/employees/${employee?.username}/projects`}>
              <p>{employee?.projectTotalCount}</p> Projects
            </Link>
            <Link href={`/employees/${employee?.username}/tasks`}>
              <p>{employee?.taskTotalCount}</p> Tasks
            </Link>
            <Link href={`/employees/${employee?.username}/issues`}>
              <p>{employee?.issueTotalCount}</p> Issues
            </Link>
          </section>
        )}
        <div className={styles.buttonwrapper}>
          <RippleButton
            text="Message"
            backgroundColor="#272829"
            effectColor="#61677A"
            textColor="white"
          />
          <RippleButton
            text="More"
            backgroundColor="#80B3FF"
            textColor="white"
          />
        </div>
      </section>
      {supervisor !== null && isProfile && (
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
              <Link
                style={{ fontSize: '12px' }}
                href={`/employees/${supervisor?.username}`}
              >
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
