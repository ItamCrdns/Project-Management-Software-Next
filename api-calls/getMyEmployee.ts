import serverFetcher from '@/utility/serverFetcher'
import { type Employee } from '@/interfaces/employee'

const getMyEmployee = async (): Promise<{
  data: Employee | null
  status: number
}> => await serverFetcher('Employee/me')

export default getMyEmployee
