import styles from '../projectslist.module.css'
import LoggedInCard from './LoggedInCard'
import Link from 'next/link'

interface TitleWrapperProps {
  title: string
  returnToProjects: boolean
}

const TitleWrapper = ({
  title,
  returnToProjects
}: TitleWrapperProps): JSX.Element => {
  return (
    <div className={styles.titlewrapper}>
      <span>
        <span
          style={{ fontSize: '50px' }}
          className="material-symbols-outlined"
        >
          tactic
        </span>
        <h1>{title}</h1>
        {returnToProjects && (
          <Link
            className="material-symbols-outlined"
            style={{ fontWeight: 500, fontSize: '50px' }}
            href="/projects"
          >
            keyboard_return
          </Link>
        )}
      </span>
      <LoggedInCard />
    </div>
  )
}

export default TitleWrapper
