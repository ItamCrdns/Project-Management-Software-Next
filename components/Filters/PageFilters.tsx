import RippleButton from '../ripplebutton/RippleButton'
import SelectAuthor from './SelectAuthor'
// import styles from './filters.module.css'

interface PageFiltersProps {
  toggle: boolean
  showPictures?: boolean
}

const PageFilters: React.FC<PageFiltersProps> = (props) => {
  const { toggle } = props

  // TODO: Might do a grayish button until the users sets some filters
  return (
    <div>
      <SelectAuthor toggle={toggle} showPictures={props.showPictures} />
      <p>Team</p>
      <p>Priority</p>
      <RippleButton
        text="Apply filters"
        backgroundColor="var(--darker-banner-color)"
      />
    </div>
  )
}

export default PageFilters
