import styles from '../projectslist.module.css'
import LoggedInCard from './LoggedInCard'

const TitleWrapper = (): JSX.Element => {
  return (
    <div className={styles.titlewrapper}>
      <span>
        <span
          style={{ fontSize: '50px' }}
          className="material-symbols-outlined"
        >
          tactic
        </span>
        <h1>Projects by company</h1>
      </span>
      <LoggedInCard />
    </div>
  )
}

export default TitleWrapper
