import getProjectLimited from '@/api-calls/getProjectLimited'
import ProjectUI from '@/components/UI/ProjectUI/ProjectUI'

const Project: React.FC<{ clientId: string; projectId: string }> = async (
  props
) => {
  const { data, status } = await getProjectLimited(props.projectId)

  return (
    <ProjectUI
      project={data}
      showButtons
      noProject={status !== 200}
      clientId={props.clientId}
    />
  )
}

export { Project }
