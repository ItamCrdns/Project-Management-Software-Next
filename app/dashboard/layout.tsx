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
      {props.user}
      {props.projects}
      <section className={styles.menus}>
        {props.tasks}
        {props.issues}
      </section>
    </section>
  )
}

export default DashboardPage
