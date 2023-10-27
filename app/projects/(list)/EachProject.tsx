import { type Project } from '@/interfaces/project'
import EntityRenderer from '@/components/Generic Entity Renderer/EntityRenderer'
import { type Entity } from '@/components/Generic Entity Renderer/EntityRenderer'

interface EachProjectProps {
  project: Project
  showCompanyName: boolean // Used to track if the each project component should show the company name in one of its columns or not
  // ! If using showCompanyname, you should also set the "dashboard" property in the HeaderDescriptor to true
}

const EachProject: React.FunctionComponent<EachProjectProps> = ({
  project,
  showCompanyName
}) => {
  // * Map the project to fit the Entity interface
  const projectAsEntity: Entity = {
    name: project.name,
    parentName: project.company.name,
    id: project.projectId,
    creator: project.projectCreator,
    employees: project.employees,
    priority: project.priority,
    created: project.created
  }

  return (
    <EntityRenderer
      entity={projectAsEntity}
      showParentEntity={showCompanyName}
      entityBasePath="projects"
      parentBasePath='company'
    />
  )
}

export default EachProject
