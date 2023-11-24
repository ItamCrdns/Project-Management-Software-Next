import SelectAuthor from './SelectAuthor'
// import styles from './filters.module.css'

interface PageFiltersProps {
  toggle: boolean
  showPictures?: boolean
}

const PageFilters: React.FC<PageFiltersProps> = (props) => {
  const { toggle } = props

  return (
    <div>
      <SelectAuthor toggle={toggle} showPictures={props.showPictures} />
      <p>Team</p>
      <p>Priority</p>
    </div>
  )
}

export default PageFilters
