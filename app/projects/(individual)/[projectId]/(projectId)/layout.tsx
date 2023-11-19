import getProject from '@/api-calls/getProject'
import { type Images } from '@/interfaces/images'
import { type Employee } from '@/interfaces/employee'
import { type Company } from '@/interfaces/company'
import ProjectUI from './ProjectUI'

interface ProjectIdProps {
  children: React.ReactNode
  tasks: React.ReactNode
  params: { projectId: string }
}

const ProjectId: React.FC<ProjectIdProps> = async (props) => {
  const { children, tasks, params } = props

  const { data } = await getProject(params.projectId)

  const project = data?.entity
  const images = project?.images as Images
  const employees = project?.team as Employee[]
  const company = project?.company as Company
  const projectCreator = project?.creator as Employee

  const employeeCount = project?.employeeCount ?? 0
  const projectId = project?.projectId ?? 0

  const tasksCount = project?.tasksCount ?? 0

  // * Checker if current logged in user its participant or creator of the project.
  // ? Will both we boolean values
  const isParticipant = data?.isParticipant ?? false
  const isOwner = data?.isOwner ?? false

  return (
    <ProjectUI
      project={project}
      company={company}
      images={images}
      projectCreator={projectCreator}
      employees={employees}
      projectId={projectId}
      employeeCount={employeeCount}
      tasksCount={tasksCount}
      tasks={tasks}
      isParticipant={isParticipant}
      isOwner={isOwner}
    >
      {children}
    </ProjectUI>
  )
}

export default ProjectId
