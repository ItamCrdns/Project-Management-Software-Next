import getProject from '@/api-calls/getProject'
import CannotCreate from './CannotCreate'
import Create from './Create'

interface NewTaskProps {
  params: { projectId: string }
}

const NewTask: React.FC<NewTaskProps> = async (props) => {
  const { projectId } = props.params
  const { data } = await getProject(projectId)
  const project = data?.entity
  const notParticipantOrOwner = data?.isOwner === false && !data?.isParticipant

  if (notParticipantOrOwner) {
    return <CannotCreate />
  } else {
    return <Create project={project} />
  }
}

export default NewTask
