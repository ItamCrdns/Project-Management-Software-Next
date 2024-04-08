import getProjectLimited from '@/api-calls/getProjectLimited'
import ProjectUI from '@/components/UI/ProjectUI/ProjectUI'

const Project: React.FC<{ projectId: string }> = async (props) => {
  const { data } = await getProjectLimited(props.projectId)

  return <ProjectUI project={data} showButtons />
}

export { Project }
