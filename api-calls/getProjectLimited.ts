import { type Project } from '@/interfaces/project'
import fetcher from '@/utility/fetcher'

export interface Data {
  entity: Project
  isParticipant: boolean
  isOwner: boolean
}

const getProjectLimited = async (
  id: string
): Promise<{ data: Data | null, status: number }> =>
  await fetcher(`${process.env.NEXT_PUBLIC_API_URL}Project/${id}/limited`)
export default getProjectLimited
