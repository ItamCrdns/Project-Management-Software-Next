import styles from '../projectslist.module.css'
import LoggedInCard from './LoggedInCard'

interface TitleWrapperProps {
  title: string
}

const TitleWrapper = ({ title }: TitleWrapperProps): JSX.Element => {
  return (
    <div className={styles.titlewrapper}>
      <span>
        <span
          style={{ fontSize: '50px' }}
          className="material-symbols-outlined"
        >
          emoji_objects
        </span>
        <h1>{title}</h1>
      </span>
      <LoggedInCard />
    </div>
  )
}

export default TitleWrapper
