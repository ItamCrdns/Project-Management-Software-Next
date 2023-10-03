import styles from './dashboard.module.css'

const DashboardPage = (props: {
  projects: React.ReactNode
  user: React.ReactNode
  tasks: React.ReactNode
  employees: React.ReactNode
}): JSX.Element => {
  return (
    <section className={styles.dashboard}>
      {props.user}
      <section className={styles.menus}>
        {props.projects}
        {props.tasks}
        {props.employees}
      </section>
    </section>
  )
}

export default DashboardPage
