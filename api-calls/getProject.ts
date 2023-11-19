import idFetcher from '@/utility/idFetcher'
import { type Project } from '@/interfaces/project'

interface Data {
  entity: Project
  isParticipant: boolean
  isOwner: boolean
}

const getProject = async (
  id: string
): Promise<{ data: Data | null, status: number }> =>
  await idFetcher('Project', id)

export default getProject
