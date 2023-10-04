import styles from './employee.module.css'

const Colleagues = (): JSX.Element => {
  return (
    <section className={styles.colleagues}>
      <div className={styles.titlewrapper}>
        <span className="material-symbols-outlined">groups</span>
        <h1>Colleagues</h1>
      </div>
      <p>Here we will show their colleagues</p>
    </section>
  )
}

export default Colleagues
