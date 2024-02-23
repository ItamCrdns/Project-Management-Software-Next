import LoggedInCard from './LoggedInCard'

interface TitleWrapperProps {
  title: string
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
    <div className='flex items-center select-none w-full justify-between'>
      <h1 className='text-2xl'>{title}</h1>
      <LoggedInCard {...cardProps} />
    </div>
  )
}

export default TitleWrapper
