import idFetcher from '@/utility/idFetcher'
import { type Employee } from '@/interfaces/employee'

const getEmployee = async (
  id: string
): Promise<{ data: Employee | null, status: number }> =>
  await idFetcher('Employee/username', id)

export default getEmployee
