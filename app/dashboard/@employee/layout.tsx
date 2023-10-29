import styles from '../dashboard.module.css'

interface EmployeeDashboardProps {
  projects: React.ReactNode
}

const EmployeeDashboard: React.FunctionComponent<EmployeeDashboardProps> = (
  props
) => {
  return <section className={styles.dashboard}>{props.projects}</section>
}

export default EmployeeDashboard
