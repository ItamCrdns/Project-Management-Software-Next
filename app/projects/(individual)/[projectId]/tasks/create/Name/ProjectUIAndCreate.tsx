import getProjectLimited from '@/api-calls/getProjectLimited'
import ProjectUI from '@/components/UI/ProjectUI/ProjectUI'
import { Create } from './Create'
import CannotCreate from '../CannotCreate'

const ProjectUIAndCreate: React.FC<{ projectId: string }> = async (props) => {
  const { data, status } = await getProjectLimited(props.projectId)

  const isOwner = data?.isOwner ?? false

  return (
    <>
      <ProjectUI
        project={data}
        showButtons={false}
        noProject={status !== 200}
      />
      {isOwner ? <Create projectId={props.projectId} /> : <CannotCreate />}
    </>
  )
}

export default ProjectUIAndCreate
