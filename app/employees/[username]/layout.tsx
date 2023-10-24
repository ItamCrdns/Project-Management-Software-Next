import styles from './employee.module.css'

const EmployeeIdLayout = async (props: {
  children: React.ReactNode
  colleagues: React.ReactNode
  employeeCard: React.ReactNode
  projects: React.ReactNode
  tasks: React.ReactNode
  recentActivity: React.ReactNode
  issues: React.ReactNode
}): Promise<JSX.Element> => {
  return (
    <>
      {props.children}
      <main className={styles.main}>
        {props.employeeCard}
        <section className={styles.contentwrapper}>
          {/* {props.recentActivity} */}
          {props.projects}
          {props.tasks}
          {props.issues}
        </section>
        <section className={styles.rightsidewrapper}>
          {props.colleagues}
        </section>
      </main>
    </>
  )
}

export default EmployeeIdLayout
