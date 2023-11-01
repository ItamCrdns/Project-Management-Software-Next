import idFetcher from '@/utility/idFetcher'
import { type Project } from '@/interfaces/project'

const getProject = async (
  id: string
): Promise<{ data: Project | null, status: number }> =>
  await idFetcher('Project', id)

export default getProject
