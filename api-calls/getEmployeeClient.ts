import clientIdFetcher from '@/utility/clientIdFetcher'
import { type Employee } from '@/interfaces/employee'

const getEmployeeClient = async (
  username: string
): Promise<{ data: Employee | null, status: number }> =>
  await clientIdFetcher('Employee/username', username)

export default getEmployeeClient
