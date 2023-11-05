import ProjectsFilter from './ProjectsFilter'
import EntityDashboardOptions from './_dashboard/EntityDashboardOptions'

interface EntityFiltersProps {
  entityName: string | undefined
  toggle: boolean
}

const EntityFilters: React.FC<EntityFiltersProps> = (props) => {
  const { entityName, toggle } = props

  return (
    <>
      {entityName !== undefined && entityName === 'project' && (
        <ProjectsFilter toggle={toggle} />
      )}
      {entityName !== undefined && entityName === 'projectdashboard' && (
        <EntityDashboardOptions toggle={toggle} />
      )}
    </>
  )
}

export default EntityFilters
