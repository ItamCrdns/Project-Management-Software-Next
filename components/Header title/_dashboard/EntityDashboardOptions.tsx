import PageSize from './PageSize'
import { type IFilter } from '@/interfaces/props/context props/IFilter'

interface EntityDashboardOptionsProps {
  entityName: string
}

const EntityDashboardOptions: React.FC<EntityDashboardOptionsProps> = (
  props
) => {
  return <PageSize entity={props.entityName as keyof IFilter} />
}

export default EntityDashboardOptions
