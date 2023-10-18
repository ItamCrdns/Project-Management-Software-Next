import styles from '../employee.module.css'

const Tasks = (): JSX.Element => {
  return (
    <section className={styles.taskswrapper}>
      <div className={styles.titlewrapper}>
        <div>
          <span className="material-symbols-outlined">auto_stories</span>
          <h1>Current tasks</h1>
        </div>
      </div>
      <p>Here we will show their current tasks.</p>
    </section>
  )
}

export default Tasks
