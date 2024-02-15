import styles from '@/app/projects/(list)/projectslist.module.css'
import LoggedInCard from './LoggedInCard'

interface TitleWrapperProps {
  title: string
  icon: string
  showButton?: boolean
  buttonText?: string
  buttonHref?: string
  buttonWidth?: string
  isDashboard?: boolean
  showPictures?: boolean // ? Will be used to show pictures in the options dropdown
  isPage?: boolean
}

// ? TitleWrapper component holds a big title for an entity and a button that can contain options, a button, and some text

const TitleWrapper: React.FC<TitleWrapperProps> = (props) => {
  const {
    title,
    icon,
    showButton,
    buttonText,
    buttonHref,
    buttonWidth,
    isDashboard,
    showPictures,
    isPage
  } = props

  const cardProps = {
    optionsText: 'Filters',
    isDashboard,
    isPage,
    showButton,
    buttonText,
    buttonHref,
    buttonWidth,
    showPictures
  }
  return (
    <div className={styles.titlewrapper}>
      <span>
        <span
          style={{ fontSize: '50px' }}
          className='material-symbols-outlined'
        >
          {icon}
        </span>
        <h1>{title}</h1>
      </span>
      <LoggedInCard {...cardProps} />
    </div>
  )
}

export default TitleWrapper
