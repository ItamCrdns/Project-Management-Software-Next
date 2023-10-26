import styles from './dashboard.module.css'

interface DashboardPageProps {
  projects: React.ReactNode
  user: React.ReactNode
  tasks: React.ReactNode
  issues: React.ReactNode
  employees: React.ReactNode
}

const DashboardPage: React.FunctionComponent<DashboardPageProps> = (props) => {
  return (
    <section className={styles.dashboard}>
      {/* {props.user} */}
      <section className={styles.menus}>
        {props.projects}
        {props.tasks}
        {props.issues}
        {/* {props.employees} */}
      </section>
    </section>
  )
}

export default DashboardPage
