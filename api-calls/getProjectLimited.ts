import { type ApiResponse } from '@/interfaces/apiResponse'
import { type Project } from '@/interfaces/project'
import { type Data } from '@/utility/api/DataParticipantOwner.interface'
import fetcher from '@/utility/fetcher'

const getProjectLimited = async (
  id: string
): Promise<ApiResponse<Data<Project>>> =>
  await fetcher(`${process.env.NEXT_PUBLIC_API_URL}Project/${id}/limited`)
export default getProjectLimited
