import styles from './employee.module.css'

const EmployeeIdLayout = async (props: {
  colleagues: React.ReactNode
  employeeCard: React.ReactNode
  projects: React.ReactNode
  tasks: React.ReactNode
  recentActivity: React.ReactNode
}): Promise<JSX.Element> => {
  return (
    <main className={styles.main}>
      {props.employeeCard}
      <section className={styles.contentwrapper}>
        {props.recentActivity}
        {props.tasks}
        {props.projects}
      </section>
      <section className={styles.rightsidewrapper}>{props.colleagues}</section>
    </main>
  )
}

export default EmployeeIdLayout
