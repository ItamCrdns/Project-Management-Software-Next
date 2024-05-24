import getProjectLimited from '@/api-calls/getProjectLimited'
import ProjectUIWithButtons from '@/components/UI/ProjectUI/ProjectUIWithButtons'

const Project: React.FC<{ clientId: string; projectId: string }> = async (
  props
) => {
  const { data, status } = await getProjectLimited(props.projectId)

  return (
    <ProjectUIWithButtons
      project={data}
      showButtons
      noProject={status !== 200}
      clientId={props.clientId}
    />
  )
}

export { Project }
