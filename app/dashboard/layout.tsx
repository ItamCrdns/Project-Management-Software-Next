import styles from './dashboard.module.css'

const DashboardPage = (props: {
  projects: React.ReactNode
  user: React.ReactNode
  tasks: React.ReactNode
}): JSX.Element => {
  return (
    <>
      {props.user}
      <section className={styles.menus}>
        {props.projects}
        {props.tasks}
      </section>
    </>
  )
}

export default DashboardPage
