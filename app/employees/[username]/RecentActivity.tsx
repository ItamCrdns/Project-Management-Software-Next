import { type EmployeeCardProps } from './EmployeeCard'
import styles from './employee.module.css'

const RecentActivity = ({ employee }: EmployeeCardProps): JSX.Element => {
  return (
    <section className={styles.activitywrapper}>
      <h1>
        Recent activity of <span>{employee?.username}</span>
      </h1>
      <section className={styles.recentactivity}>
        <p>Here we will show their recent stuff.</p>
      </section>
    </section>
  )
}

export default RecentActivity
