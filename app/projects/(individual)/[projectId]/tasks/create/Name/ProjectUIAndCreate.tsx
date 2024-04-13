import getProjectLimited from '@/api-calls/getProjectLimited'
import ProjectUI from '@/components/UI/ProjectUI/ProjectUI'
import { Create } from './Create'
import CannotCreate from '../CannotCreate'

const ProjectUIAndCreate: React.FC<{ projectId: string }> = async (props) => {
  const { data } = await getProjectLimited(props.projectId)

  const isOwner = data?.isOwner ?? false

  return (
    <>
      <ProjectUI project={data} showButtons={false} />
      {isOwner ? <Create projectId={props.projectId} /> : <CannotCreate />}
    </>
  )
}

export default ProjectUIAndCreate
