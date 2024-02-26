import CannotCreate from './CannotCreate'
import { Create } from './Name/Create'
import getProjectLimited from '@/api-calls/getProjectLimited'

interface NewTaskProps {
  params: { projectId: string }
}

const NewTask: React.FC<NewTaskProps> = async (props) => {
  const { projectId } = props.params
  const { data } = await getProjectLimited(projectId)

  const notParticipantOrOwner = data?.isOwner === false && !data?.isParticipant

  if (notParticipantOrOwner) {
    return <CannotCreate />
  } else {
    return <Create project={data} />
  }
}

export default NewTask
