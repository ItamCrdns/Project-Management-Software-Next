import styles from '../employee.module.css'

const RecentActivity = (): JSX.Element => {
  return (
    <section className={styles.activitywrapper}>
      <h1>
        Recent activity of <span>employee name</span>
      </h1>
      <section className={styles.recentactivity}>
        <p>Here we will show their recent stuff.</p>
      </section>
    </section>
  )
}

export default RecentActivity
