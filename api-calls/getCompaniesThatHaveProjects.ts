import fetcher from '@/utility/fetcher'
import { type Company } from '@/interfaces/company'

const getCompaniesThatHaveProjects = async (): Promise<{
  data: Company[] | null
  status: number
}> => await fetcher('Company/all')

export default getCompaniesThatHaveProjects
