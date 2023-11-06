import styles from '@/app/projects/(list)/userbanner.module.css'
import SortBy from './SortBy'
import PageSize from './PageSize'

interface EntityDashboardOptionsProps {
  toggle: boolean
}

const EntityDashboardOptions: React.FC<EntityDashboardOptionsProps> = (
  props
) => {
  if (props.toggle) {
    return (
      <section className={styles.popup}>
        <SortBy />
        <PageSize />
      </section>
    )
  }
}

export default EntityDashboardOptions
