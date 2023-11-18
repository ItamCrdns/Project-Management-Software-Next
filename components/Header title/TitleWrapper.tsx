import styles from '@/app/projects/(list)/projectslist.module.css'
import LoggedInCard from './LoggedInCard'

interface TitleWrapperProps {
  title: string
  icon: string
  showButton?: boolean
  buttonText?: string
  buttonHref?: string
  buttonWidth?: string
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
        optionsText="Options"
        entityName='project'
        showButton={props.showButton}
        buttonText={props.buttonText}
        buttonHref={props.buttonHref}
        buttonWidth={props.buttonWidth}
      />
    </div>
  )
}

export default TitleWrapper
