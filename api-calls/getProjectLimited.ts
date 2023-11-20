import { type Project } from '@/interfaces/project'
import fetcher from '@/utility/fetcher'

const getProjectLimited = async (
  id: string
): Promise<{ data: Project | null, status: number }> =>
  await fetcher(`${process.env.NEXT_PUBLIC_API_URL}Project/${id}/limited`)
export default getProjectLimited
