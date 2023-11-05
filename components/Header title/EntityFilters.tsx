import ProjectsFilter from './ProjectsFilter'

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
    </>
  )
}

export default EntityFilters
