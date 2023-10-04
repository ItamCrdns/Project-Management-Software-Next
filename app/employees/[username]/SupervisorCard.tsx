import { type Employee } from '@/interfaces/employee'
import styles from './employee.module.css'
import Image from 'next/image'
import Link from 'next/link'

interface SupervisorProps {
  employee: Employee | null
}

const SupervisorCard = ({ employee }: SupervisorProps): JSX.Element => {
  const supervisor = employee?.supervisor

  return (
    <section className={styles.employeecard}>
      <h2>Supervisor</h2>
      <div className={styles.supervisorcontainer}>
        <Image
          src={supervisor?.profilePicture ?? ''}
          alt={supervisor?.username ?? ''}
          width={50}
          height={50}
        />
        <p><Link href={`/employees/${supervisor?.username}`}>{supervisor?.username}</Link></p>
      </div>
    </section>
  )
}

export default SupervisorCard
