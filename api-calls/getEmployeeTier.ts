import serverFetcher from '@/utility/serverFetcher'
import { type EmployeeTier } from '@/interfaces/EmployeeTier'

const getEmployeeTier = async (): Promise<{
  data: EmployeeTier | null
  status: number
}> => await serverFetcher('Employee/me/tier')

export default getEmployeeTier
