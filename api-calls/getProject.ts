import idFetcher from '@/utility/idFetcher'
import { type Project } from '@/interfaces/project'
import { type ApiResponse } from '@/interfaces/apiResponse'
import { type Data } from '@/utility/api/DataParticipantOwner.interface'

const getProject = async (
  id: string
): Promise<ApiResponse<Data<Project>>> =>
  await idFetcher('Project', id)

export default getProject
