import ProjectsFilter from './ProjectsFilter'
import EntityDashboardOptions from './_dashboard/EntityDashboardOptions'

interface EntityFiltersProps {
  entityName: string
  toggle: boolean
}

const EntityFilters: React.FC<EntityFiltersProps> = (props) => {
  const { entityName, toggle } = props

  return (
    <>
      {entityName !== undefined && entityName === 'project' && (
        // !  This is for the x/projects page. Might change it
        <ProjectsFilter toggle={toggle} />
      )}
      {entityName !== undefined && (
        <EntityDashboardOptions toggle={toggle} entityName={props.entityName} />
      )}
    </>
  )
}

export default EntityFilters
