import styles from '../employee.module.css'

const CurrentProjects = (): JSX.Element => {
  return (
    <section className={styles.projectswrapper}>
      <div className={styles.titlewrapper}>
        <span className="material-symbols-outlined">tactic</span>
        <h1>Current projects</h1>
      </div>
      <p>Here we will show their current projects.</p>
    </section>
  )
}

export default CurrentProjects
