import styles from '../employee.module.css'
import { type UsernameParamsProps } from '@/interfaces/props/UsernameParamsProps'

const RecentActivity: React.FC<UsernameParamsProps> = ({ params }) => {
  return (
    <section className={styles.activitywrapper}>
      <h1>
        Recent activity of <span>{params.username}</span>
      </h1>
      <section className={styles.recentactivity}>
        <p>Here we will show their recent stuff.</p>
      </section>
    </section>
  )
}

export default RecentActivity
