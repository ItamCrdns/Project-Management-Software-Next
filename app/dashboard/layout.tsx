import styles from './dashboard.module.css'

const DashboardPage = (props: {
  projects: React.ReactNode
  user: React.ReactNode
}): JSX.Element => {
  return (
    <>
      {props.user}
      <section className={styles.menus}>{props.projects}</section>
    </>
  )
}

export default DashboardPage
