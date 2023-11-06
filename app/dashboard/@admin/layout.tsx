import styles from '../dashboard.module.css'

interface AdminDashboardProps {
  projects: React.ReactNode
  tasks: React.ReactNode
  issues: React.ReactNode
  employees: React.ReactNode
  user: React.ReactNode
}

const AdminDashboard: React.FC<AdminDashboardProps> = (props) => {
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

export default AdminDashboard
