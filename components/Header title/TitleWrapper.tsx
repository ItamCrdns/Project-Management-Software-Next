import styles from '@/app/projects/(list)/projectslist.module.css'
import LoggedInCard from './LoggedInCard'

interface TitleWrapperProps {
  title: string
  icon: string
  buttonText: string
  buttonHref: string
  buttonWidth?: string
  isProject?: boolean
  isTask?: boolean
  isIssue?: boolean
}

const TitleWrapper: React.FC<TitleWrapperProps> = (props) => {
  return (
    <div className={styles.titlewrapper}>
      <span>
        <span
          style={{ fontSize: '50px' }}
          className="material-symbols-outlined"
        >
          {props.icon}
        </span>
        <h1>{props.title}</h1>
      </span>
      <LoggedInCard
        buttonText={props.buttonText}
        buttonHref={props.buttonHref}
        buttonWidth={props.buttonWidth}
        isProject={props.isProject}
        isTask={props.isTask}
        isIssue={props.isIssue}
      />
    </div>
  )
}

export default TitleWrapper
