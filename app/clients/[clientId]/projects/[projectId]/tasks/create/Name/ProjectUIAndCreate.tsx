import getProjectLimited from '@/api-calls/getProjectLimited'
import ProjectUIWithButtons from '@/components/UI/ProjectUI/ProjectUIWithButtons'
import { Create } from './Create'
import CannotCreate from '../CannotCreate'

const ProjectUIAndCreate: React.FC<{ clientId: string; projectId: string }> =
  async (props) => {
    const { data, status } = await getProjectLimited(props.projectId)

    const isOwner = data?.isOwner ?? false

    return (
      <>
        <ProjectUIWithButtons
          project={data}
          clientId={props.clientId}
          showButtons={false}
          noProject={status !== 200}
        />
        {isOwner ? <Create projectId={props.projectId} /> : <CannotCreate />}
      </>
    )
  }

export default ProjectUIAndCreate
