import styles from '@/app/projects/(list)/userbanner.module.css'
import SortBy from './SortBy'
import PageSize from './PageSize'
import { type IFilter } from '@/interfaces/props/context props/IFilter'

interface EntityDashboardOptionsProps {
  toggle: boolean
  entityName: string
}

const EntityDashboardOptions: React.FC<EntityDashboardOptionsProps> = (
  props
) => {
  if (props.toggle) {
    return (
      <section className={styles.popup}>
        <SortBy />
        <PageSize entity={props.entityName as keyof IFilter}/>
      </section>
    )
  }
}

export default EntityDashboardOptions
