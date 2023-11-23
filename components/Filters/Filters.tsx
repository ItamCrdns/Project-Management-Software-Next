import styles from '@/app/projects/(list)/userbanner.module.css'
import EntityDashboardOptions from '../Header title/_dashboard/EntityDashboardOptions'
import PageFilters from './PageFilters'

interface FiltersProps {
  entityName: string
  toggle: boolean
  isDashboard?: boolean // ? This will use state based filtering. Good for the dashboard ("/dashboard")
  isPage?: boolean // ? This will use query params based filtering. Good for regular pages ("/projects", "/employee/projects", etc)
}

const Filters: React.FC<FiltersProps> = (props) => {
  const { entityName, toggle, isDashboard, isPage } = props

  if (toggle) {
    return (
      <div className={styles.popup}>
        <p>Filters</p>
        {isDashboard === true && (
          <EntityDashboardOptions entityName={entityName} />
        )}
        {isPage === true && <PageFilters toggle={toggle} />}
      </div>
    )
  }
}

export default Filters
