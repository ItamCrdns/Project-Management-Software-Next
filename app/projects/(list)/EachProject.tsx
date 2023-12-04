import EntityRenderer from '@/components/Generic Entity Renderer/EntityRenderer'
import { type Entity } from '@/components/Generic Entity Renderer/EntityRenderer'
import { type EachProjectProps } from '@/interfaces/props/EachProjectProps'

const EachProject: React.FunctionComponent<EachProjectProps> = (props) => {
  const { project, showCompanyName } = props

  // * Map the project to fit the Entity interface
  const projectAsEntity: Entity = {
    name: project.name,
    parentName: project.company.name,
    id: project.projectId,
    creator: project.creator,
    employees: project.team,
    priority: project.priority,
    created: project.created
  }

  return (
    <EntityRenderer
      entity={projectAsEntity}
      showParentEntity={showCompanyName}
      entityBasePath='projects'
      parentBasePath='company'
      width='300px'
      maxWidth='300px'
    />
  )
}

export default EachProject
