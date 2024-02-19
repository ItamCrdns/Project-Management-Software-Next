import serverFetcher from '@/utility/serverFetcher'
import { type Employee } from '@/interfaces/employee'

interface Return {
  data: Employee | null
  status: number
}

export const getMyEmployee = async (): Promise<Return> => await serverFetcher('Employee/me')
