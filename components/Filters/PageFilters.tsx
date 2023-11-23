import SelectAuthor from './SelectAuthor'
import styles from './filters.module.css'

interface PageFiltersProps {
  toggle: boolean
}

const PageFilters: React.FC<PageFiltersProps> = (props) => {
  const { toggle } = props

  return (
    <div>
      <SelectAuthor toggle={toggle} />
      <p>Team</p>
      <p>Priority</p>
    </div>
  )
}

export default PageFilters
